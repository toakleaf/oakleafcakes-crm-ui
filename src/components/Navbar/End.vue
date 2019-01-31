<template>
  <div class="navbar-end">
    <div class="navbar-item has-dropdown is-hoverable">
      <!-- <a class="navbar-link">More</a> -->
      <router-link to="/profile" class="navbar-link">Lookin' fine, {{displayName}}!</router-link>

      <div class="navbar-dropdown">
        <router-link to="/profile" class="navbar-item">My Deets</router-link>
        <router-link to="/admin" class="navbar-item">User Admin</router-link>
        <hr class="navbar-divider">
        <a @click="$store.dispatch('logout')" class="navbar-item">Log Out</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "End",
  computed: {
    displayName: function() {
      if (!this.$store.getters.userDisplayName) {
        this.fetchUserData();
      }
      return this.$store.getters.userDisplayName;
    }
  },
  methods: {
    ...mapActions(["fetchUserData"])
  }
};
</script>
