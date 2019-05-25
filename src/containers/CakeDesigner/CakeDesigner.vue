<template>
  <div class="columns is-multiline">
    <div class="column is-two-thirds">
      <app-design-display/>
    </div>
  </div>
</template>

<script>
import ColorSelector from "@/containers/CakeDesigner/ColorSelector.vue";
import DesignDisplay from "@/containers/CakeDesigner/DesignDisplay.vue";

export default {
  components: {
    "app-color-selector": ColorSelector,
    "app-design-display": DesignDisplay
  },
  name: "CakeDesigner",
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>

