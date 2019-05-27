<template>
  <section class="container pad-route no-print-gutters">
    <div class="box no-print-borders">
      <app-cake-builder/>
    </div>
  </section>
</template>

<script>
import CakeBuilder from "@/containers/CakeBuilder/CakeBuilder.vue";

export default {
  components: {
    "app-cake-builder": CakeBuilder
  },
  name: "test",
  data: function() {
    return {
      open: false
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>

