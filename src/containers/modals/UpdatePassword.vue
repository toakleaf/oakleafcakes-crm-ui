<template>
  <form action>
    <div class="modal-card modal-width">
      <header class="modal-card-head">
        <p class="subtitle">Manage Password</p>
      </header>
      <section class="modal-card-body">
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            Account:
            <span class="has-text-grey">{{email}}</span>
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered" v-if="!update">
          <div class="control">
            <a class="button is-primary" @click="update = true">
              <span class="icon">
                <i class="fas fa-pencil-alt"></i>
              </span>
              <span>Update Password</span>
            </a>
          </div>
        </div>
        <div class="field" v-if="update">
          <app-password-check @update:password="updatePassword"/>
        </div>
        <div class="field is-grouped" v-if="update">
          <div class="control">
            <a class="button is-primary" :disabled="!valid || error" @click="submitUpdates">
              <span class="icon">
                <i class="far fa-save"></i>
              </span>
              <span>Save New Password</span>
            </a>
          </div>
          <div class="control">
            <a class="button" @click="update = false">
              <span class="icon">
                <i class="fas fa-arrow-left"></i>
              </span>
            </a>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered" v-if="!update">
          <div class="control">-or-</div>
        </div>
        <div class="field is-grouped is-grouped-centered" v-if="!update">
          <div class="control">
            <a class="button is-danger" @click="sendPasswordReset">
              <span class="icon">
                <i class="far fa-paper-plane"></i>
              </span>
              <span>Delete + Send PW Reset Email</span>
            </a>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
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
import PasswordCheck from "@/components/Form/PasswordCheck.vue";

export default {
  components: {
    "app-password-check": PasswordCheck
  },
  props: ["id", "email"],
  name: "UpdatePassword",
  data: function() {
    return {
      update: false,
      password: null,
      valid: false,
      error: true
    };
  },
  computed: {},
  methods: {
    updatePassword: function(val) {
      if (!val) return;
      this.password = val.password;
      this.valid = val.valid;
      this.error = val.error;
    },
    sendPasswordReset: function() {
      if (!this.email) return;
      this.$store
        .dispatch("pushPasswordReset", {
          email: this.email
        })
        .then(() => this.$parent.close());
    },
    submitUpdates: function() {
      if (
        !(this.id && this.email && this.password && this.valid && !this.error)
      )
        return;
      this.$store
        .dispatch("pushAccountUpdate", {
          id: this.id,
          update: {
            emails: [
              {
                current_email: this.email,
                is_login: true
              }
            ],
            password: this.password
          }
        })
        .then(() => this.$parent.close());
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
