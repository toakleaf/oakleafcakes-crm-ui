<template>
  <b-collapse class="card" aria-id="contentIdForA11y3" v-if="account">
    <div
      slot="trigger"
      slot-scope="props"
      class="card-header"
      role="button"
      aria-controls="contentIdForA11y3"
    >
      <p
        class="card-header-title"
      >{{account.first_name ? (account.first_name + ' ' + account.last_name) : account.company_name ? account.company_name : null }}</p>
      <a class="card-header-icon">
        <span class="is-size-7 has-text-grey" style="margin-right: 1em;">{{account.role}}</span>
        <b-icon :icon="props.open ? 'chevron-down' : 'chevron-up'" pack="fa"></b-icon>
      </a>
    </div>
    <app-display-card :account="account" v-if="!editing"/>
    <app-edit-card :account="account" @update:account="listenUpdates" v-if="editing"/>
    <footer class="card-footer">
      <a
        class="card-footer-item has-link-danger"
        @click="submitUpdates()"
        v-if="editing && !disabled"
      >
        <span class="icon">
          <i class="far fa-save"></i>
        </span>
        Update
      </a>
      <p class="card-footer-item has-text-grey" v-if="editing && disabled">
        <span class="icon">
          <i class="far fa-save"></i>
        </span>
        <strike>Update</strike>
      </p>
      <a class="card-footer-item" @click="editing = false, disabled = true" v-if="editing">
        <span class="icon">
          <i class="fas fa-ban"></i>
        </span>
        Cancel
      </a>
      <a class="card-footer-item" @click="editing = true" v-if="!editing">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        Edit
      </a>
      <a class="card-footer-item" v-if="!editing">
        <span class="icon">
          <i class="far fa-plus-square"></i>
        </span>
        Email
      </a>
      <a class="card-footer-item" v-if="!editing">
        <span class="icon">
          <i class="far fa-plus-square"></i>
        </span>
        Phone
      </a>
    </footer>
  </b-collapse>
</template>

<script>
import EmailCheck from "@/components/Form/EmailCheck.vue";
import DisplayCard from "@/components/AccountCard/DisplayCard.vue";
import EditCard from "@/components/AccountCard/EditCard.vue";

export default {
  components: {
    "app-email-check": EmailCheck,
    "app-display-card": DisplayCard,
    "app-edit-card": EditCard
  },
  name: "AccountCard",
  props: ["account"],
  data: function() {
    return {
      editing: false,
      disabled: true,
      update: null
    };
  },
  computed: {},
  methods: {
    listenUpdates: function(val) {
      this.disabled = val.error;
      this.update = val.update;
    },
    submitUpdates: function(val) {
      if (!this.account || !this.update) return;
      this.$store.dispatch("pushAccountUpdate", {
        id: this.account.id,
        update: this.update
      });
      this.editing = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.card-dates {
  line-height: 90%;
  margin: 0 0 -1em 0;
}
</style>
