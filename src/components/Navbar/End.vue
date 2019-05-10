<template>
  <div class="navbar-end">
    <div class="navbar-item has-dropdown is-hoverable">
      <!-- <a class="navbar-link">More</a> -->
      <router-link
        to="/profile"
        class="navbar-link"
        v-if="$store.getters.author"
      >Lookin' fine, {{$store.getters.author.first_name}}!</router-link>

      <div class="navbar-dropdown">
        <router-link to="/profile" class="navbar-item">My Deets</router-link>
        <router-link
          v-if="$store.getters.author && $store.getters.author.role === 'ADMIN'"
          to="/employees"
          class="navbar-item"
        >Employee Admin</router-link>
        <router-link
          v-if="$store.getters.author && $store.getters.author.role === 'ADMIN'"
          to="/admin"
          class="navbar-item"
        >System Admin</router-link>
        <hr class="navbar-divider">
        <a @click="$store.dispatch('logout')" class="navbar-item">Log Out</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "End"
};
</script>
