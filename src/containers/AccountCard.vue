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
    <app-edit-card
      :account="account"
      @update:account="listenUpdates"
      v-if="editing"
      @update:editing="editing = false"
      @deleteEmail="deleteEmail"
      @deletePhone="deletePhone"
    />
    <footer class="card-footer">
      <a
        class="card-footer-item has-link-danger"
        @click="submitUpdates()"
        v-if="editing && !disabled"
      >
        <span class="icon">
          <i class="far fa-save"></i>
        </span>
        <span>Update</span>
      </a>
      <p class="card-footer-item has-text-grey" v-if="editing && disabled">
        <span class="icon">
          <i class="far fa-save"></i>
        </span>
        <span>
          <strike>Update</strike>
        </span>
      </p>
      <a class="card-footer-item" @click="editing = false, disabled = true" v-if="editing">
        <span class="icon">
          <i class="fas fa-ban"></i>
        </span>
        <span>Cancel</span>
      </a>
      <a class="card-footer-item" @click="editing = true" v-if="!editing">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        <span>Edit</span>
      </a>
      <a class="card-footer-item" v-if="!editing" @click="emailModal">
        <span class="icon">
          <i class="far fa-plus-square"></i>
        </span>
        <span>Email</span>
      </a>
      <a class="card-footer-item" v-if="!editing" @click="phoneModal">
        <span class="icon">
          <i class="far fa-plus-square"></i>
        </span>
        <span>Phone</span>
      </a>
    </footer>
  </b-collapse>
</template>

<script>
import DisplayCard from "@/components/AccountCard/DisplayCard.vue";
import EditCard from "@/components/AccountCard/EditCard.vue";
import AddEmail from "@/containers/modals/AddEmail.vue";
import AddPhone from "@/containers/modals/AddPhone.vue";

export default {
  components: {
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
      this.$store
        .dispatch("pushAccountUpdate", {
          id: this.account.id,
          update: this.update
        })
        .then(() => {
          this.$toast.open({
            message: "Account updated successfully!",
            position: "is-bottom",
            type: "is-success"
          });
        })
        .catch(err => {
          console.error(err);
          this.$toast.open({
            message: "Failed to update account",
            position: "is-bottom",
            type: "is-danger"
          });
        });
      this.editing = false;
    },
    emailModal: function() {
      this.$modal.open({
        props: { id: this.account.id },
        parent: this,
        component: AddEmail,
        hasModalCard: true
      });
    },
    phoneModal: function() {
      this.$modal.open({
        props: { id: this.account.id },
        parent: this,
        component: AddPhone,
        hasModalCard: true
      });
    },
    deleteEmail: function(val) {
      if (!val || !val.email) return;
      this.$store
        .dispatch("deleteAccountEmail", {
          id: this.account.id,
          emails: [{ email: val.email }]
        })
        .then(() => {
          this.$toast.open({
            message: `Successfully deleted email address ${val.email}!`,
            position: "is-bottom",
            type: "is-success"
          });
          this.$emit("update:editing");
        })
        .catch(err => {
          console.error(err);
          this.$toast.open({
            message: "Failed to delete email.",
            position: "is-bottom",
            type: "is-danger"
          });
          this.$emit("update:editing");
        });
    },
    deletePhone: function(val) {
      if (!val || !val.phone) return;
      this.$store
        .dispatch("deleteAccountPhone", {
          id: this.account.id,
          phones: [{ phone: val.phone }]
        })
        .then(() => {
          this.$toast.open({
            message: `Successfully deleted phone number ${val.phone}!`,
            position: "is-bottom",
            type: "is-success"
          });
          this.$emit("update:editing");
        })
        .catch(err => {
          console.error(err);
          this.$toast.open({
            message: "Failed to delete phone number.",
            position: "is-bottom",
            type: "is-danger"
          });
          this.$emit("update:editing");
        });
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
