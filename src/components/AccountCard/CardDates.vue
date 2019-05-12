<template>
  <nav class="level card-dates is-desktop">
    <div class="level-item has-text-centered">
      <p class="is-size-7" style="padding: 0 .25em 0 .25em">
        Created:
        <span class="has-text-grey">{{created.toLocaleString()}}</span>
      </p>
    </div>
    <div class="level-item has-text-centered" style="padding: 0 .25em 0 .25em">
      <p v-if="created.toLocaleString() !== updated.toLocaleString()" class="is-size-7">
        Updated:
        <span class="has-text-grey">{{updated.toLocaleString()}}</span>
      </p>
    </div>
  </nav>
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
