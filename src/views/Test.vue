<template>
  <section class="container pad-route">
    <div class="box">
      <h1 class="title">Cake Designer</h1>
      <div class="columns is-multiline">
        <div class="column is-two-thirds">
          <app-cake-designer/>
        </div>
        <div class="column">
          <a class="button" @click="open=!open">open</a>
        </div>
      </div>
      <div class="column" v-if="open">
        <img src="https://live.staticflickr.com/4607/39135150455_f0774def7f_k.jpg" alt>
      </div>
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

