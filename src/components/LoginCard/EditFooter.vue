<template>
  <footer class="card-footer">
    <p class="card-footer-item has-text-grey is-unselectable" v-if="disabled">
      <span class="icon">
        <i class="far fa-save"></i>
      </span>
      <strike>Update</strike>
    </p>
    <a
      class="card-footer-item has-link-danger"
      @click="$emit('submitUpdates'); $emit('update:disabled', true)"
      v-else
    >
      <span class="icon">
        <i class="far fa-save"></i>
      </span>
      <span>Update</span>
    </a>
    <a
      class="card-footer-item"
      @click="$emit('update:editing', false); $emit('update:disabled', true)"
    >
      <span v-if="disabled">
        <span class="icon">
          <i class="fas fa-arrow-left"></i>
        </span>
        <span>Back</span>
      </span>
      <span v-else>
        <span class="icon">
          <i class="fas fa-ban"></i>
        </span>
        <span>Cancel Edit</span>
      </span>
    </a>
  </footer>
</template>

<script>
export default {
  name: "EditFooter",
  props: ["editing", "disabled"]
};
</script>


<style lang="scss" scoped>
</style>
