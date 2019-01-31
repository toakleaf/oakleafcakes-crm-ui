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
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    @keyup.enter="login({email, password})"
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
                  <button @click.prevent="login({email, password})" class="button is-primary">Login</button>
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: null,
      password: null,
      res: {}
    };
  },
  methods: {
    ...mapActions(["login"])
  }
};
</script>


<style lang="scss" scoped>
</style>
