<template>
  <section class="container pad-route">
    <div class="box">
      <h1 class="title">Cake Builder</h1>
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

