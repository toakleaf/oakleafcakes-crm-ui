<template>
  <div class="columns">
    <div class="column">
      <div class="columns is-gapless is-marginless">
        <app-day v-for="date in weeksArray[0]" :key="date.valueOf()" :date="date" :isFirstRow="true"/>
      </div>
      <div v-if="weeksArray.length > 0" v-for="index in weeksArray.length - 1" :key="index" class="columns is-gapless is-marginless">
        <app-day v-for="date in weeksArray[index]" :key="date.valueOf()" :date="date" :isFirstRow="false"/>
        <!-- shoot blanks to fill out row -->
        <app-day v-for="remainder in 7 - weeksArray[index].length" :key="remainder" :date="null" :isFirstRow="false"/>
      </div>
    </div>
  </div>
</template>

<script>
import Day from "@/components/Calendar/Day.vue";
export default {
  name: "Week",
  components: {
    "app-day": Day
  },
  props: ["start", "end"],
  computed: {
    weeksArray: function() {
      if (this.difference < 21) {
        const dates = [new Date(this.start)];
        for (let i = 0; i < this.difference; i++) {
          const date = new Date(this.start);
          date.setDate(dates[i].getDate() + 1);
          dates.push(date);
        }
        const weeks = []
        for (let i = 0; i < dates.length; i += 7) {
          const temp = dates.slice(i,i + 7)
          weeks.push(temp)
        }
        return weeks;
      }
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
