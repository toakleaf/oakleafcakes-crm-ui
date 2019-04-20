<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-one-third">
            <div class="box">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    :class="{'is-success': !$v.password.$invalid, 'is-danger': $v.password.$error}"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    @blur="$v.password.$touch()"
                  >
                  <span class="icon is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    :class="{'is-success': !$v.confirmPassword.$invalid, 'is-danger': $v.confirmPassword.$error}"
                    type="password"
                    placeholder="Confirm Password"
                    v-model="confirmPassword"
                    @blur="$v.confirmPassword.$touch()"
                  >
                  <span class="icon is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p
                  class="is-size-7 has-text-grey"
                >Passwords must be at least 12 characters in length.</p>
              </div>

              <div class="field is-grouped is-grouped-centered">
                <p class="control">
                  <button
                    class="button is-primary"
                    :class="{'is-loading': submitting}"
                    @click="submitReset"
                    :disabled="$v.$invalid"
                  >Reset Password</button>
                </p>
              </div>
            </div>
            <router-link to="/login" class="has-text-light is-size-7">Return to Login Page</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "../axiosAPI";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import router from "../router";

export default {
  name: "reset",
  data: function() {
    return {
      password: null,
      confirmPassword: null,
      submitting: false
    };
  },
  validations: {
    password: {
      required,
      minLen: minLength(12)
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password")
    }
  },
  methods: {
    submitReset: function() {
      this.submitting = true;
      this.$store.dispatch("logout", false);
      axios
        .post(
          `/account/reset/${this.$route.params.id}/${this.$route.params.hash}`,
          { password: this.password }
        )
        .then(res => {
          this.submitting = false;
          localStorage.setItem("token", res.headers["x-auth-token"]);
          this.$store.commit("setAuthToken", res.headers["x-auth-token"]);
          this.$store.dispatch(
            "setLogoutTimer",
            this.$store.getters["tokenExp"]
          );
          this.$store.dispatch("setAuthHeaders");
          router.replace("/profile");
        })
        .catch(err => {
          alert("Request Submission Failed.");
          router.replace("/login");
        });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
