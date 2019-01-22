<template>
  <section id="app" class="has-navbar-fixed-top">
    <app-navbar/>
    <section class="hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            <router-view/>
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar/Navbar.vue";
export default {
  components: {
    "app-navbar": Navbar
  }
};
</script>


<style lang="scss">
// CSS Debugger File:
// @import "./assets/styles/debug.css";
</style>
