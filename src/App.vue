<template>
  <section id="app" class="has-navbar-fixed-top">
    <app-navbar/>
    <router-view/>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
export default {
  components: {
    "app-navbar": Navbar
  }
  // created() {
  //   this.$store.dispatch("persistSession");
  // }
};
</script>


<style lang="scss">
// CSS Debugger File:
// @import "./assets/styles/debug.css";
body {
  background-color: #6b6051;
  min-height: 100vh;
}
.pad-top {
  padding-top: 72px;
}
</style>
