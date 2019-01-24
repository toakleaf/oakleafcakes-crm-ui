<template>
  <div class="columns is-gapless">
    <app-day v-for="n in 7" :key="n" :date="n"></app-day>
  </div>
</template>

<script>
import Day from "@/components/Calendar/Day.vue";
export default {
  name: "Week",
  components: {
    "app-day": Day
  }
};
</script>


<style lang="scss" scoped>
</style>
