<template>
  <div class="menu">
    <app-tier-menu
      v-for="(tier, i) in tiersDesc"
      :key="i"
      :tier="tier"
      :tierIndex="i"
      :numTiers="tiers.length"
      @update:tier="emitChanges(i, ...arguments)"
      @delete:tier="emitDeletion(i)"
    />
    <div>
      <a @click="emitAddition(0)">+ Add Tier Above</a>
      <a class="is-pulled-right" @click="emitAddition(tiersDesc.length)">+ Add Tier Below</a>
    </div>
  </div>
</template>

<script>
import TierMenu from "@/containers/CakeBuilder/TierMenu.vue";

export default {
  name: "Menu",
  props: ["tiers"],
  components: {
    "app-tier-menu": TierMenu
  },
  data: function() {
    return {
      open: false
    };
  },
  computed: {
    tiersDesc: function() {
      return this.tiers.slice().reverse();
    }
  },
  methods: {
    emitChanges: function(i, val) {
      const out = this.tiersDesc.slice();
      out[i] = val;
      this.$emit("update:tiers", out.reverse());
    },
    emitAddition: function(
      index = 0,
      newTier = {
        id: `${Math.floor(Math.random() * 10000)}`,
        width: 8,
        height: 4
      }
    ) {
      let out = this.tiersDesc.slice();
      out.splice(index, 0, newTier);
      out.reverse();
      this.$emit("update:tiers", out);
    },
    emitDeletion: function(i) {
      let out = this.tiersDesc.slice();
      out.splice(i, 1);
      out.reverse();
      this.$emit("update:tiers", out);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  font-family: "Shadows Into Light Two", cursive;
  // text-align: center;
}
</style>

