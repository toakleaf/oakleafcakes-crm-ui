<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-one-third">
            <div class="box">
              <section class="section has-text-centered">
                <img src="@/assets/img/logo_full.svg">
              </section>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    @keyup.enter="login({email, password})"
                    v-model="email"
                    class="input"
                    type="email"
                    placeholder="Email"
                    @blur="$v.email.$touch();"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    @keyup.enter="attemptLogin"
                    v-model="password"
                    class="input"
                    type="password"
                    placeholder="Password"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <p class="control">
                  <button
                    @click.prevent="attemptLogin"
                    class="button is-primary"
                    :class="{'is-loading': submitting}"
                    :disabled="$v.$invalid"
                  >Login</button>
                </p>
              </div>
            </div>
            <router-link to="/forgot" class="has-text-light is-size-7">Lost your password?</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: null,
      password: null,
      submitting: false
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    clearForm: function() {
      this.email = null;
      this.password = null;
    },
    attemptLogin: function() {
      if (this.$v.$invalid) return;
      this.submitting = true;
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      this.submitting = false;
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
