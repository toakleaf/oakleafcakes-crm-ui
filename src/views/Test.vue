<template>
  <section class="container pad-route">
    <div class="box">
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

