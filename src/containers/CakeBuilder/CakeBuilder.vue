<template>
  <div class="columns is-multiline">
    <div class="column is-half">
      <app-sketch :tiers="tiers"/>
    </div>
  </div>
</template>

<script>
import Sketch from "@/containers/CakeBuilder/Sketch.vue";

export default {
  components: {
    "app-sketch": Sketch
  },
  name: "CakeBuilder",
  props: {},
  data: function() {
    return {
      tiers: [
        {
          width: 18,
          height: 0.5
        },
        {
          width: 14,
          height: 4,
          fill: "lightblue",
          fillStyle: "cross-hatch",
          fillWeight: 0.5,
          fillGap: 1
        },
        {
          width: 9,
          height: 4
        },
        {
          width: 11,
          height: 4
        },
        {
          width: 8,
          height: 6,
          fill: "lightblue",
          fillGap: 1
        },
        {
          width: 5,
          height: 4
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>

