<template>
  <section id="app" class="has-navbar-fixed-top">
    <app-navbar/>
    <router-view/>
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
body {
  background-color: #6b6051;
  height: 100vh;
}
</style>
