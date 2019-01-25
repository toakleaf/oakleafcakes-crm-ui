<template>
  <div class="columns">
    <div class="column">
      <div class="columns is-gapless is-marginless">
        <app-day
          v-for="(date, index) in weeksArray[0]"
          :key="date? date.valueOf() : index"
          :date="date"
          :isFirstRow="true"
        />
      </div>
      <div
        v-show="weeksArray.length > 0"
        v-for="index in weeksArray.length - 1"
        :key="index"
        class="columns is-gapless is-marginless"
      >
        <app-day
          v-for="date in weeksArray[index]"
          :key="date.valueOf()"
          :date="date"
          :isFirstRow="false"
        />
        <!-- shoot blanks to fill out row -->
        <app-day
          v-for="remainder in 7 - weeksArray[index].length"
          :key="remainder"
          :date="null"
          :isFirstRow="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Day from "@/components/Calendar/Day.vue";
export default {
  name: "Days",
  components: {
    "app-day": Day
  },
  props: ["start", "end"],
  computed: {
    weeksArray: function() {
      const dates = [];
      if (this.difference >= 21) {
        //pad with dates from 1970 so list starts on Sunday
        const sunday = new Date("1/4/1970");
        for (let i = 0; i < this.start.getDay() - 1; i++) {
          if (!i) dates.push(sunday);
          const pad = new Date(dates[i]);
          pad.setDate(dates[i].getDate() + 1);
          dates.push(pad);
        }
      }
      dates.push(new Date(this.start));
      const offset = dates.length - 1;
      for (let i = 0; i < this.difference + offset; i++) {
        if (dates[i].getFullYear() < 1971) continue;
        const date = new Date(this.start);
        // set all anew to fix date rollover bug
        date.setFullYear(dates[i].getFullYear());
        date.setMonth(dates[i].getMonth());
        date.setDate(dates[i].getDate() + 1);
        dates.push(date);
      }
      const weeks = [];
      for (let i = 0; i < dates.length; i += 7) {
        const temp = dates.slice(i, i + 7);
        weeks.push(temp);
      }
      return weeks;
    },
    difference: function() {
      const diff =
        this.end -
        this.start +
        (this.start.getTimezoneOffset() - this.end.getTimezoneOffset()) *
          60 *
          1000;
      const oneDay = 1000 * 60 * 60 * 24;
      return Math.abs(Math.floor(diff / oneDay));
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
