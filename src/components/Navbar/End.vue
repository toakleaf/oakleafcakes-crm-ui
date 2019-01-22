<template>
  <div class="navbar-end">
    <router-link to="/login" class="navbar-item">Login</router-link>
    <div class="navbar-item">
      <div class="buttons">
        <router-link to="/login" class="button is-primary">
          <strong>Login</strong>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "End"
};
</script>
