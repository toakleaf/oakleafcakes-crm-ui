<template>
  <section class="container pad-route">
    <div class="box">
      <h1 class="title">Cake Designer</h1>
      <app-cake-designer/>
    </div>
  </section>
</template>

<script>
import CakeDesigner from "@/containers/CakeDesigner/CakeDesigner.vue";

export default {
  components: {
    "app-cake-designer": CakeDesigner
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

