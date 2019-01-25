<template>
  <section class="section pad-navbar">
    <div class="container">
      <div class="box">
        <h1 class="title">Calendar</h1>
        <div class="columns">
          <div class="column">
            <div class="columns is-centered">
              <div class="column has-text-centered">
                <app-range-picker :start.sync="start" :end.sync="end"/>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns">
              <div class="column">
                <app-date-picker :start.sync="start" :end.sync="end"/>
              </div>
            </div>
          </div>
        </div>
        <app-week :start="start" :end="end"/>
      </div>
    </div>
  </section>
</template>
<script>
import Week from "@/components/Calendar/Week.vue";
import DatePicker from "@/components/Calendar/DatePicker.vue";
import RangePicker from "@/components/Calendar/RangePicker.vue";
export default {
  name: "calendar",
  components: {
    "app-week": Week,
    "app-date-picker": DatePicker,
    "app-range-picker": RangePicker
  },
  data: function() {
    return {
      start: new Date(),
      end: new Date()
    };
  }
};
</script>

<style lang="scss" >
</style>

