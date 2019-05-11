<template>
  <form action>
    <div class="modal-card modal-width">
      <header class="modal-card-head">
        <p class="subtitle">Add New Email</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <app-email-check @update:email="updateEmail"/>
        </div>
        <div class="field">
          <b-checkbox v-model="isPrimary">Make Primary</b-checkbox>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" :disabled="!valid || error" @click="submitUpdates">
          <span class="icon">
            <i class="far fa-plus-square"></i>
          </span>
          <span>Email</span>
        </a>
        <a class="button" @click="$parent.close()">
          <span class="icon">
            <i class="fas fa-ban"></i>
          </span>
          <span>Cancel</span>
        </a>
      </footer>
    </div>
  </form>
</template>

<script>
import EmailCheck from "@/components/Form/EmailCheck.vue";

export default {
  components: {
    "app-email-check": EmailCheck
  },
  props: ["id"],
  name: "AddEmail",
  data: function() {
    return {
      isPrimary: false,
      email: null,
      valid: false,
      error: true
    };
  },
  computed: {},
  methods: {
    updateEmail: function(val) {
      if (!val) return;
      this.email = val.email;
      this.valid = val.valid;
      this.error = val.error;
    },
    submitUpdates: function() {
      if (!(this.id && this.valid && !this.error && this.email)) return;
      this.$store
        .dispatch("pushAccountUpdate", {
          id: this.id,
          update: {
            emails: [
              {
                new_email: this.email,
                ...(this.isPrimary ? { is_primary: true } : {})
              }
            ]
          }
        })
        .then(() => {
          this.$parent.close();
          this.$toast.open({
            message: "Email added successfully!",
            position: "is-bottom",
            type: "is-success"
          });
        })
        .catch(err => {
          this.$toast.open({
            message: "Failed to add new email.",
            position: "is-bottom",
            type: "is-danger"
          });
          console.error(err);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.modal-width {
  width: auto;
  min-width: 20em;
}
</style>
