<template>
  <div class="column" :class="{'is-hidden-mobile': isEmptyCell}">
    <div
      class="box is-radiusless is-paddingless is-marginless has-background-dark has-text-centered date-heading"
      :class="{'is-hidden-tablet': !isFirstRow}"
    >
      <h6 class="subtitle is-5 has-text-light pad-day">{{day.toDateString().substring(0,3)}}</h6>
    </div>
    <div class="box date-box is-radiusless is-paddingless is-marginless">
      <p v-if="!isEmptyCell" class="pad-number">{{date.getDate()}}</p>
      <div class="pad-bottom">
        <div
          class="pill has-background-primary has-text-white is-clipped"
        >hi this is a lot of text to put</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Day",
  props: ["date", "isFirstRow"],
  computed: {
    day: function() {
      //so if null date will have year < 1971
      return new Date(this.date);
    },
    isEmptyCell: function() {
      return this.day.getFullYear() < 1971;
    }
  }
};
</script>


<style lang="scss" scoped>
.pad-day {
  padding: 5px 0px;
}
.pad-number {
  padding: 0 0 0 0.5em;
}
.date-heading {
  min-height: 2.25em;
}
.date-box {
  min-height: 8em;
}
.pill {
  border: 1px solid white;
  border-radius: 0.75em;
  padding: 0px 0.5em;
  width: 100%;
  max-height: 1.5em;
  overflow: hidden;
}
</style>
