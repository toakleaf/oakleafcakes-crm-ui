<template>
  <div class="column">
    <div
      class="box is-radiusless is-paddingless is-marginless has-background-dark has-text-centered"
      :class="{'is-hidden-tablet': !isFirstRow}"
    >
      <h6
        class="subtitle is-5 has-text-light pad-day"
      >{{date && date.toDateString().substring(0,3)}}</h6>
    </div>
    <div class="box date-box is-radiusless is-paddingless is-marginless">
      <p class="pad-number">{{date && date.getDate()}}</p>
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
  props: ["date", "isFirstRow"]
};
</script>


<style lang="scss" scoped>
.pad-day {
  padding: 5px 0px;
}
.pad-number {
  padding: 0 0 0 0.5em;
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
