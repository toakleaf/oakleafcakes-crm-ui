<template>
  <nav
    class="navbar is-primary is-fixed-top no-print"
    role="navigation"
    aria-label="main navigation"
  >
    <nav-brand @toggle-menu="showMenu = !showMenu"/>
    <div v-if="auth" class="navbar-menu" :class="{'is-active' : showMenu}">
      <nav-start/>
      <nav-end :first_name="first_name" :role="role" @logout="logout()"/>
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
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    first_name() {
      return this.$store.getters.authorFirstName;
    },
    role() {
      return this.$store.getters.authorRole;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped lang="scss">
</style>
