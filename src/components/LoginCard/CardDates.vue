<template>
  <p class="has-text-centered card-dates">
    <span class="is-size-7">
      Created:
      <span class="has-text-grey">{{created.toLocaleString()}}</span>
    </span>
    <span class="is-size-7" v-if="created.toLocaleString() !== updated.toLocaleString()">
      Updated:
      <span class="has-text-grey">{{updated.toLocaleString()}}</span>
    </span>
  </p>
</template>

<script>
export default {
  name: "CardDates",
  props: {
    created: {
      type: Date
    },
    updated: {
      type: Date
    }
  }
};
</script>


<style lang="scss" scoped>
.card-dates {
  line-height: 90%;
  margin: 0 0 -1em 0;
}
</style>
