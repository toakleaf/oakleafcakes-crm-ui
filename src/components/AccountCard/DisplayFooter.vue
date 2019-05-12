<template>
  <footer class="card-footer">
    <a class="card-footer-item" @click="$emit('update:editing', true)">
      <span class="icon">
        <i class="fas fa-edit"></i>
      </span>
      <span>Edit</span>
    </a>
    <a class="card-footer-item" @click="$emit('addEmail')">
      <span class="icon">
        <i class="far fa-plus-square"></i>
      </span>
      <span>Email</span>
    </a>
    <a class="card-footer-item" @click="$emit('addPhone')">
      <span class="icon">
        <i class="far fa-plus-square"></i>
      </span>
      <span>Phone</span>
    </a>
  </footer>
</template>

<script>
export default {
  name: "DisplayFooter",
  props: ["editing", "disabled"]
};
</script>


<style lang="scss" scoped>
</style>
