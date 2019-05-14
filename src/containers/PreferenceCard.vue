<template>
  <b-collapse class="card" aria-id="contentIdForA11y3">
    <div
      slot="trigger"
      slot-scope="props"
      class="card-header"
      role="button"
      aria-controls="contentIdForA11y3"
    >
      <p class="card-header-title">
        <span class="icon is-medium">
          <i class="fas fa-clipboard-list fa-lg"></i>
        </span>
        Preferences
      </p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'chevron-down' : 'chevron-up'" pack="fa"></b-icon>
      </a>
    </div>
    <div class="card-content">
      <div class="content has-text-centered"></div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        <span>Edit</span>
      </a>
    </footer>
  </b-collapse>
</template>

<script>
export default {
  name: "PreferenceCard",
  data: function() {
    return {
      editing: false,
      disabled: true,
      update: null
    };
  },
  computed: {},
  methods: {}
};
</script>


<style lang="scss" scoped>
</style>
