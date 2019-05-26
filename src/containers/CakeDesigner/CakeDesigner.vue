<template>
  <div class="columns is-multiline">
    <div class="column is-half">
      <svg
        version="1.1"
        id="cake"
        ref="cake"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :viewBox="`0 0 ${cakeWidth} ${cakeHeight}`"
      >
        <svg
          v-for="(tier, i) in tiers"
          :key="i"
          class="tier"
          :x="(cakeWidth - (tier.width * inch)) / 2 - pad"
          :y="getTierPosition(i)"
        >
          <!-- <text :y="20 * (i + 1)">{{tier.width}}</text> -->
          <app-tier
            :width="tier.width"
            :height="tier.height"
            :pad="pad"
            :roughness="roughness"
            :bowing="bowing"
          ></app-tier>
        </svg>
      </svg>
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
  props: {
    minCakeWidth: {
      type: Number,
      default: 5
    },
    minCakeHeight: {
      type: Number,
      default: 4
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
      inch: 18.5,
      pad: 2,
      radiusRatio: 9.25,
      tiers: [
        {
          width: 18,
          height: 4
        },
        {
          width: 14,
          height: 4
        },
        {
          width: 12,
          height: 4
        },
        {
          width: 11,
          height: 4
        },
        {
          width: 8,
          height: 6
        },
        {
          width: 5,
          height: 4
        }
      ]
    };
  },
  computed: {
    cakeWidth: function() {
      return (
        this.inch *
          Math.max(
            ...this.tiers.map(o => (o.width ? o.width : 0)),
            this.minCakeWidth
          ) +
        this.pad * 2
      );
    },
    cakeHeight: function() {
      return (
        this.inch *
          this.tiers
            .map(o => (o.height ? o.height : 0))
            .reduce((accumulator, currentValue) => accumulator + currentValue) +
        (this.cakeWidth / this.radiusRatio) * 2 +
        this.pad * 2
      );
    }
  },
  methods: {
    getTierPosition: function(i) {
      if (i === this.tiers.length - 1) return 0;
      let pos = 0;
      for (let j = this.tiers.length - 1; j > i; j--) {
        pos += this.tiers[j].height ? this.tiers[j].height * this.inch : 0;
      }
      return pos;
    }
  }
};
</script>

<style lang="scss" scoped>
svg {
  overflow: visible;
}
#cake {
  // border: solid 2px;
  // border-color: darkgray;
}
.tier {
}
</style>

