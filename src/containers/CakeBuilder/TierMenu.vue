<template>
  <div class="tier-menu-item">
    <b-collapse :open="false" aria-id="contentIdForA11y1">
      <h3 class="is-size-4" slot="trigger" aria-controls="contentIdForA11y1" @click="open = !open">
        <!-- {{width}}{{tier.width}} -->
        <span v-if="numTiers === 1">Tier</span>
        <span v-else-if="tierIndex === numTiers - 1">Bottom tier</span>
        <span v-else-if="!tierIndex">Top tier</span>
        <span v-else>Tier #{{tierIndex + 1}}</span>
        <span class="icon is-pulled-right is-medium">
          <i class="fas fa-chevron-down" v-if="open"></i>
          <i class="fas fa-chevron-up" v-else></i>
        </span>
        <span class="is-size-7 is-pulled-right" style="margin:1em 1em 0 0">{{width}}" x {{height}}"</span>
      </h3>
      <ul>
        <li>
          <app-draw-star-svg/>Shape:
          <select class="has-text-link" :vale="shape">
            <option value="round">Round</option>
            <option value="square">Square</option>
            <option value="topsyturvy">Topsy Turvy</option>
          </select>
        </li>
        <li>
          <app-draw-star-svg/>
          <select class="has-text-link" v-model="width" @change="emitTierUpdate({...tier, width})">
            <option v-for="n in 14" :key="n" :value="n + 4">{{n + 4}}"</option>
          </select>
          wide x
          <select
            class="has-text-link"
            v-model="height"
            @change="emitTierUpdate({...tier, height})"
          >
            <option v-for="n in [3, 4, 6, 8]" :key="n" :value="n">{{n}}"</option>
          </select>
          tall
        </li>
        <li>
          <app-draw-star-svg/>&#8776;
          <input
            type="text"
            :value="getServings()"
            size="3"
            maxnumTiers="3"
            class="has-text-link"
          > servings
          <span class="is-size-7">
            <a>[+]</a> /
            <a>[–]</a>
          </span>
        </li>
      </ul>
      <a class="has-text-danger is-pulled-right is-size-7" @click="$emit('delete:tier')">[–] remove</a>
    </b-collapse>
    <app-draw-line-svg/>
  </div>
</template>

<script>
import DrawStarSVG from "@/containers/CakeBuilder/DrawStarSVG.vue";
import DrawLineSVG from "@/containers/CakeBuilder/DrawLineSVG.vue";

export default {
  name: "TierMenu",
  props: ["tier", "tierIndex", "numTiers", "servingSize"],
  props: {
    tier: {
      validator: function(obj) {
        return (
          obj.width &&
          obj.height &&
          typeof obj.width === "number" &&
          typeof obj.height === "number"
        );
      }
    },
    tierIndex: {
      type: Number,
      default: 0
    },
    numTiers: {
      type: Number,
      default: 0
    },
    servingSize: {
      type: Number,
      default: 13
    }
  },
  components: {
    "app-draw-star-svg": DrawStarSVG,
    "app-draw-line-svg": DrawLineSVG
  },
  data: function() {
    return {
      open: false,
      w: null,
      h: null,
      s: null
    };
  },
  computed: {
    width: {
      get: function() {
        return this.w ? this.w : this.tier.width;
      },
      set: function(val) {
        this.w = parseInt(val);
      }
    },
    height: {
      get: function() {
        return this.h ? this.h : this.tier.height;
      },
      set: function(val) {
        this.h = parseInt(val);
      }
    },
    shape: {
      get: function() {
        return this.s ? this.s : this.tier.shape;
      },
      set: function(val) {
        this.s = val;
      }
    }
  },
  methods: {
    getServings: function() {
      if (!this.shape || this.shape === "round") {
        const r = this.width / 2;
        return Math.round((Math.PI * r * r * this.height) / this.servingSize);
      }
    },
    emitTierUpdate: function(obj) {
      this.$emit("update:tier", {
        ...obj,
        id: `${Math.floor(Math.random() * 10000)}`
      });
      this.clearLocal();
    },
    clearLocal: function() {
      this.w = null;
      this.h = null;
      this.s = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.tier-menu-item select,
.tier-menu-item select:focus {
  font-family: "Shadows Into Light Two", cursive;
  font-size: inherit;
  color: inherit;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  outline: 0;
  // border-bottom: 1pt solid;
  /* needed for Firefox: */
  overflow: hidden;
  width: auto;
  background: transparent;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
}

.tier-menu-item input,
.tier-menu-item input:focus {
  font-family: inherit;
  font-size: inherit;
  text-decoration: underline;
  color: inherit;
  border: 0;
  // border-bottom: 1pt solid;
  outline: 0;
  background: transparent;
  margin: 0 -0.5em;
  width: auto;
  text-align: center;
  cursor: pointer;
}

.tier-menu-item ul li {
  margin-left: 1.5em;
}
</style>

