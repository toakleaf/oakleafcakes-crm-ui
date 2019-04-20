<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-one-third" v-if="!submitted">
            <div class="box">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    :class="{'is-success': !$v.email.$invalid, 'is-danger': $v.email.$error}"
                    type="text"
                    placeholder="@mail"
                    v-model="email"
                    @blur="$v.email.$touch()"
                    @keyup.enter="submitForgot"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <p class="control">
                  <button
                    class="button is-primary"
                    :class="{'is-loading': submitting}"
                    @click="submitForgot"
                    :disabled="$v.$invalid"
                  >Send Me a Reset Email</button>
                </p>
              </div>
            </div>
            <router-link to="/login" class="has-text-light is-size-7">Return to Login Page</router-link>
          </div>
          <div class="column is-one-third" v-if="submitted">
            <div class="box">
              <p>
                Your request for a password reset has been recieved. If you have an active account you
                should recieve an email with instructions on resetting your password shortly.
              </p>
              <p>If you do not recieve an email, please contact the site administrator for assistance.</p>
              <p>Thank you!</p>
              <br>
              <router-link to="/login" class="button is-primary">Return to Login Page</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "../axiosAPI";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "forgot",
  data: function() {
    return {
      email: null,
      submitting: false,
      submitted: false
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submitForgot: function() {
      this.submitting = true;
      this.$store.dispatch("logout", false);
      axios
        .post("/account/forgot", { email: this.email })
        .then(() => {
          this.submitting = false;
          this.submitted = true;
        })
        .catch(err => {
          this.alert("Failed to submit request.");
        });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
