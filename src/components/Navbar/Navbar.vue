<template>
  <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
    <nav-brand @toggle-menu="showMenu = !showMenu"/>
    <div class="navbar-menu" :class="{'is-active' : showMenu}">
      <nav-start/>
      <nav-end/>
    </div>
  </nav>
</template>

<script>
import Brand from "@/components/Navbar/Brand.vue";
import Start from "@/components/Navbar/Start.vue";
import End from "@/components/Navbar/End.vue";
export default {
  name: "Navbar",
  components: {
    "nav-brand": Brand,
    "nav-start": Start,
    "nav-end": End
  },
  data: function() {
    return {
      showMenu: false
    };
  },
  watch: {
    $route(to, from) {
      this.showMenu = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
