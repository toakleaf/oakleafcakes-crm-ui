<template>
  <section class="pad-route">
    <div class="container">
      <div class="box">
        <b-dropdown class="is-pulled-right" v-model="weekBegins">
          <button class="button is-dark" slot="trigger">
            <span>Week Begins</span>
            <b-icon pack="fas" icon="caret-down"></b-icon>
          </button>
          <b-dropdown-item v-for="day in weekDays" :key="day" :value="day">{{day}}</b-dropdown-item>
        </b-dropdown>
        <h1 class="title">Calendar</h1>
        <div class="columns">
          <div class="column no-print">
            <div class="columns is-centered">
              <div class="column has-text-centered">
                <app-range-buttons :start.sync="start" :end.sync="end" :weekBegins="weekBegins"/>
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
        <app-days :start="start" :end="end"/>
      </div>
    </div>
  </section>
</template>
<script>
import Days from "@/components/Calendar/Days.vue";
import DatePicker from "@/components/Calendar/DatePicker.vue";
import RangeButtons from "@/components/Calendar/RangeButtons.vue";
export default {
  name: "calendar",
  components: {
    "app-days": Days,
    "app-date-picker": DatePicker,
    "app-range-buttons": RangeButtons
  },
  data: function() {
    return {
      start: new Date(),
      end: new Date(),
      weekBegins: "Monday",
      weekDays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
    };
  }
};
</script>

<style lang="scss" >
</style>

