<template>
  <div class="columns is-multiline">
    <div class="column is-two-thirds">
      <app-tier/>
    </div>
  </div>
</template>

<script>
import ColorSelector from "@/containers/CakeDesigner/ColorSelector.vue";
import Tier from "@/containers/CakeDesigner/Tier.vue";

export default {
  components: {
    "app-color-selector": ColorSelector,
    "app-tier": Tier
  },
  name: "CakeDesigner",
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.colored-pencil {
  filter: grayscale(1);
}
</style>

