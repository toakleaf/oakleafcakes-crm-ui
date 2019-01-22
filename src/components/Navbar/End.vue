<template>
  <div class="navbar-end">
    <div class="navbar-item has-dropdown is-hoverable">
      <!-- <a class="navbar-link">More</a> -->
      <router-link to="/admin" class="navbar-link">Lookin' fine, {{firstName}}!</router-link>

      <div class="navbar-dropdown">
        <a class="navbar-item">My Deets</a>
        <a class="navbar-item">Manage Users</a>
        <hr class="navbar-divider">
        <a class="navbar-item">Log Out</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "End"
};
</script>
