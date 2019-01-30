<template>
  <div class="navbar-end">
    <div class="navbar-item has-dropdown is-hoverable">
      <!-- <a class="navbar-link">More</a> -->
      <router-link to="/profile" class="navbar-link">Lookin' fine, {{firstName}}!</router-link>

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
export default {
  name: "End"
};
</script>
