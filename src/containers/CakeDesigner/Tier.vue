<template>
  <svg
    version="1.1"
    id="tier"
    ref="tier"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :viewBox="`0 0 ${ptWidth + pad * 2} ${ptHeight + (yRadius + pad) * 2}`"
    xml:space="preserve"
  ></svg>
</template>

<script>
const rough = require("roughjs/dist/rough.umd");

export default {
  name: "tier",
  props: {
    width: {
      type: Number,
      default: 16
    },
    height: {
      type: Number,
      default: 4
    },
    pad: {
      type: Number,
      default: 2
    },
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeColor: {
      type: String,
      default: "grey"
    },
    roughness: {
      type: Number,
      default: 0.7
    },
    bowing: {
      type: Number,
      default: 7
    }
  },
  data: function() {
    return {
      inch: 18.5
    };
  },
  computed: {
    ptWidth: function() {
      return this.width * this.inch;
    },
    ptHeight: function() {
      return this.height * this.inch;
    },
    yRadius: function() {
      // return this.width * 2;
      return this.ptWidth / 9.25;
    },
    tier: function() {
      const rs = rough.svg(this.$refs.tier);
      return rs.path(
        `M ${this.pad},${this.yRadius + this.pad}
      a${this.ptWidth / 2},${this.yRadius} 0 1,0 ${this.ptWidth},0
      a${this.ptWidth / 2},${this.yRadius} 0 1,0 -${this.ptWidth},0
      v${this.ptHeight}
      a${this.ptWidth / 2},${this.yRadius} 0 1,0 ${this.ptWidth},0
      v-${this.ptHeight}`,
        {
          bowing: this.bowing,
          roughness: this.roughness,
          stroke: this.strokeColor,
          strokeWidth: this.strokeWidth
          // fill: "lightblue",
          // fillStyle: "cross-hatch",
          // fillWeight: 2
        }
      );
    }
  },
  methods: {},
  mounted: function() {
    this.$refs.tier.appendChild(this.tier);
  }
};
</script>

<style lang="scss" scoped>
#tier {
  border: solid 2px;
  border-color: darkgray;
  overflow: visible;
}
</style>

