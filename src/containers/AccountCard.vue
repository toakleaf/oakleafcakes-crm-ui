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
      <a class="card-header-icon is-size-7 has-text-grey">
        <span v-if="account.is_active">ACTIVE</span>

        <span v-else-if="account.logins && account.logins.length">
          <span v-if="account.logins.some(l => Date.now() - Date.parse(l) ) / 86400000 < 7">
            <!-- if < 1 week since a login was created -->
            PENDING
          </span>
          <span v-else class="has-text-danger">
            <!-- if > 1 week since a login was created -->
            SUSPENDED
          </span>
        </span>
        <span style="margin: 0 .25em 0 .25em">|</span>
        <span style="margin-right: 1em;">{{account.role}}</span>
        <b-icon :icon="props.open ? 'chevron-down' : 'chevron-up'" pack="fa"></b-icon>
      </a>
    </div>
    <app-display-card :account="account" v-if="!editing"/>
    <app-edit-card
      v-if="editing"
      :account="account"
      @update:account="listenUpdates"
      @submitUpdates="submitUpdates"
      @update:editing="editing = false"
      @addEmail="addEmailModal"
      @addPhone="addPhoneModal"
      @deleteEmail="deleteEmail"
      @deletePhone="deletePhone"
    />
    <footer
      class="card-footer"
      v-if="$store.getters.authorRole !== 'ADMIN' && account.role === 'ADMIN'"
    >
      <!-- hide editing options if not privilaged to edit. -->
    </footer>
    <app-edit-footer
      v-else-if="editing"
      :disabled.sync="disabled"
      :editing.sync="editing"
      @submitUpdates="submitUpdates"
    />
    <app-display-footer
      v-else
      :disabled.sync="disabled"
      :editing.sync="editing"
      @addEmail="addEmailModal"
      @addPhone="addPhoneModal"
    />
  </b-collapse>
</template>

<script>
import DisplayCard from "@/components/AccountCard/DisplayCard.vue";
import DisplayFooter from "@/components/AccountCard/DisplayFooter.vue";
import EditCard from "@/components/AccountCard/EditCard.vue";
import EditFooter from "@/components/AccountCard/EditFooter.vue";
import AddEmail from "@/containers/modals/AddEmail.vue";
import AddPhone from "@/containers/modals/AddPhone.vue";

export default {
  components: {
    "app-display-card": DisplayCard,
    "app-display-footer": DisplayFooter,
    "app-edit-card": EditCard,
    "app-edit-footer": EditFooter
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
      if (!this.account || !this.update || this.disabled) return;
      this.$store
        .dispatch("pushAccountUpdate", {
          id: this.account.id,
          update: this.update
        })
        .then(() => {
          this.disabled = true;
        });
    },
    addEmailModal: function() {
      this.$modal.open({
        props: { id: this.account.id },
        parent: this,
        component: AddEmail,
        hasModalCard: true
      });
    },
    addPhoneModal: function() {
      this.$modal.open({
        props: { id: this.account.id },
        parent: this,
        component: AddPhone,
        hasModalCard: true
      });
    },
    deleteEmail: function(val) {
      if (!val || !val.email) return;
      this.$store.dispatch("deleteAccountEmail", {
        id: this.account.id,
        emails: [{ email: val.email }]
      });
    },
    deletePhone: function(val) {
      if (!val || !val.phone) return;
      this.$store.dispatch("deleteAccountPhone", {
        id: this.account.id,
        phones: [{ phone: val.phone }]
      });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
