<template>
  <div class="navbar-brand">
    <router-link to="/" class="navbar-item">
      <img src="@/assets/img/logo.svg" class="navbar-logo">
    </router-link>

    <a
      @click="$emit('toggle-menu')"
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: "Brand"
};
</script>


<style lang="scss" scoped>
.navbar-logo {
  width: 60px;
  height: 28px;
}
</style>

