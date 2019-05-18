<template>
  <b-collapse
    class="card"
    aria-id="contentIdForA11y3"
    :open="open"
    v-if="account && history.length"
  >
    <div
      slot="trigger"
      slot-scope="props"
      class="card-header"
      role="button"
      aria-controls="contentIdForA11y3"
    >
      <b-loading :is-full-page="false" :active.sync="loading" :can-cancel="false"></b-loading>
      <p class="card-header-title">
        <span class="icon is-medium">
          <i class="fas fa-history fa-lg"></i>
        </span>
        Account Change History
      </p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'chevron-down' : 'chevron-up'" pack="fa"></b-icon>
      </a>
    </div>
    <div class="card-content" style="padding-bottom: 0;" v-if="history.length">
      <b-table
        :data="history"
        mobile-cards
        narrowed
        striped
        :paginated="true"
        :pagination-size="'is-small'"
        :per-page="20"
        :current-page.sync="currentPage"
        :opened-detailed="defaultOpenedDetails"
        detailed
        :detail-key="history.id"
        show-detail-icon
        icon-pack="fas"
      >
        <template slot-scope="props">
          <b-table-column field="created_at" label="Date" sortable>
            <p>{{ props.row.created_at.toLocaleString() }}</p>
          </b-table-column>
          <b-table-column field="action" label="Action" sortable>
            <p>{{ props.row.action }}</p>
          </b-table-column>
          <b-table-column field="author_name" label="Action Author" sortable>
            <p>{{ props.row.author_name }}</p>
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <div class="columns is-centered">
            <div class="column is-three-quarters-tablet">
              <p class="is-size-7">State prior to alteration:</p>
              <app-account-card :account="props.row.state" :showFooter="false"/>
            </div>
          </div>
        </template>
      </b-table>
    </div>
  </b-collapse>
</template>

<script>
import axios from "@/axiosAPI";
import AccountCard from "@/containers/AccountCard.vue";

export default {
  name: "AccountHistoryCard",
  components: {
    "app-account-card": AccountCard
  },
  props: {
    account: {
      required: true
    },
    open: {
      type: Boolean,
      default: true
    }
  },

  data: function() {
    return {
      history: [],
      defaultOpenedDetails: [],
      loading: false,
      currentPage: null,
      isOpen: null
    };
  },
  computed: {},
  methods: {
    getHistory: function() {
      if (!this.account || !this.account.id) return;
      this.loading = true;
      axios
        .get(`/account/history/${this.account.id}`)
        .then(result => {
          this.loading = false;
          this.history = result.data;
          for (let i = 0; i < this.history.length; i++) {
            this.history[i].created_at = new Date(this.history[i].created_at);
            this.history[i].state.created_at = new Date(
              this.history[i].state.created_at
            );
            this.history[i].state.updated_at = new Date(
              this.history[i].state.updated_at
            );
            this.history[i].state.emails = this.history[i].state.emails
              ? this.history[i].state.emails.map(e => {
                  return {
                    ...e,
                    created_at: new Date(e.created_at),
                    updated_at: new Date(e.updated_at)
                  };
                })
              : [];
            this.history[i].state.phones = this.history[i].state.phones
              ? this.history[i].state.phones.map(p => {
                  return {
                    ...p,
                    created_at: new Date(p.created_at),
                    updated_at: new Date(p.updated_at)
                  };
                })
              : [];
            this.history[i].state.logins = this.history[i].state.logins
              ? this.history[i].state.logins.map(l => {
                  return {
                    ...l,
                    created_at: new Date(l.created_at),
                    updated_at: new Date(l.updated_at)
                  };
                })
              : [];
          }
        })
        .catch(err => {
          this.loading = false;
          console.error("error: " + err);
        });
    }
  },
  created: function() {
    this.isOpen = this.open;
  },
  watch: {
    account: function() {
      this.getHistory();
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
