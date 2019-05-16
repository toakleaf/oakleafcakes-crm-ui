<template>
  <form action>
    <div class="modal-card modal-width">
      <header class="modal-card-head">
        <p class="subtitle">Add New Login</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <app-email-check @update:email="updateEmail"/>
        </div>
        <div class="field">
          <b-checkbox v-model="isPrimary">Make Email Primary</b-checkbox>
        </div>
        <div class="field">
          <b-checkbox v-model="sendEmail">Send PW Reset Email</b-checkbox>
        </div>
        <div class="field">
          <b-checkbox v-model="skipVerification" :disabled="sendEmail">Skip Verification</b-checkbox>
        </div>
        <div class="field">
          <b-checkbox v-model="providePassword" :disabled="sendEmail">Provide Password</b-checkbox>
        </div>
        <app-password-check @update:password="updatePassword" v-if="hasPassword"/>
      </section>
      <footer class="modal-card-foot">
        <a
          class="button is-primary"
          :disabled="!validEmail || errorEmail || (hasPassword && (!validPassword || errorPassword))"
          @click="submitUpdates"
        >
          <span class="icon">
            <i class="far fa-plus-square"></i>
          </span>
          <span>Login</span>
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
import PasswordCheck from "@/components/Form/PasswordCheck.vue";

export default {
  components: {
    "app-email-check": EmailCheck,
    "app-password-check": PasswordCheck
  },
  props: ["id"],
  name: "AddLogin",
  data: function() {
    return {
      isPrimary: false,
      isActive: false,
      sendEmail: false,
      hasPassword: false,
      email: null,
      password: null,
      validEmail: false,
      validPassword: false,
      errorEmail: true,
      errorPassword: true
    };
  },
  computed: {
    skipVerification: {
      set: function(val) {
        if (this.sendEmail === true) {
          this.isActive = false;
        } else this.isActive = val;
      },
      get: function() {
        if (this.sendEmail === true) {
          this.isActive = false;
          return false;
        }
        return this.isActive;
      }
    },
    providePassword: {
      set: function(val) {
        if (this.sendEmail === true) {
          this.hasPassword = false;
        } else this.hasPassword = val;
      },
      get: function() {
        if (this.sendEmail === true) {
          this.hasPassword = false;
          return false;
        }
        return this.hasPassword;
      }
    }
  },
  methods: {
    updateEmail: function(val) {
      if (!val) return;
      this.email = val.email;
      this.validEmail = val.valid;
      this.errorEmail = val.error;
    },
    updatePassword: function(val) {
      if (!val) return;
      this.password = val.password;
      this.validPassword = val.valid;
      this.errorPassword = val.error;
    },
    submitUpdates: function() {
      if (
        !(this.id && this.validEmail && !this.errorEmail && this.email) ||
        (this.hasPassword &&
          !(this.password && this.validPassword && !this.errorPassword))
      )
        return;
      this.$store
        .dispatch("pushAccountUpdate", {
          id: this.id,
          update: {
            emails: [
              {
                new_email: this.email,
                is_login: true,
                is_active: this.isActive,
                ...(this.isPrimary ? { is_primary: true } : {})
              }
            ],
            ...(this.hasPassword ? { password: this.password } : {})
          }
        })
        .then(() => {
          if (!this.sendEmail) return;
          this.$store.dispatch("pushPasswordReset", {
            email: this.email
          });
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
