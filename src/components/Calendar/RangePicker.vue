<template>
  <div class="buttons is-centered">
    <a
      class="button is-dark"
      :class="{'is-outlined': !showLastWeek}"
      @click="toggleLastWeek"
    >Last Week</a>
    <a
      class="button is-dark"
      :class="{'is-outlined': !showThisWeek}"
      @click="toggleThisWeek"
    >This Week</a>
    <a
      class="button is-dark"
      :class="{'is-outlined': !showNextWeek}"
      @click="toggleNextWeek"
    >Next Week</a>
  </div>
</template>

<script>
export default {
  name: "RangePicker",
  props: ["start", "end"],
  data: function() {
    return {
      today: new Date(),
      showThisWeek: true,
      showLastWeek: false,
      showNextWeek: false,
      localStart: null,
      localEnd: null,
      WEEK_BEGINS: {
        SUNDAY: 0,
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6
      },
      WEEK_LENGTH: 7
    };
  },
  watch: {
    start: function() {
      if (this.start != this.localStart || this.end != this.localEnd) {
        this.showThisWeek = false;
        this.showLastWeek = false;
        this.showNextWeek = false;
      }
    },
    end: function() {
      if (this.end != this.localEnd) {
        this.showThisWeek = false;
        this.showLastWeek = false;
        this.showNextWeek = false;
      }
    }
  },
  computed: {
    thisWeekStart: function() {
      let thisWeekStart = new Date(this.today);
      thisWeekStart.setDate(
        this.today.getDate() - this.today.getDay() + this.WEEK_BEGINS.MONDAY
      );
      return thisWeekStart;
    },
    thisWeekEnd: function() {
      let thisWeekEnd = new Date(this.today);
      thisWeekEnd.setDate(
        this.thisWeekStart.getDate() +
          this.WEEK_LENGTH -
          this.WEEK_BEGINS.MONDAY
      );
      return thisWeekEnd;
    },
    lastWeekStart: function() {
      let lastWeekStart = new Date(this.thisWeekStart);
      lastWeekStart.setDate(this.thisWeekStart.getDate() - this.WEEK_LENGTH);
      return lastWeekStart;
    },
    lastWeekEnd: function() {
      let lastWeekEnd = new Date(this.today);
      lastWeekEnd.setDate(
        this.lastWeekStart.getDate() +
          this.WEEK_LENGTH -
          this.WEEK_BEGINS.MONDAY
      );
      return lastWeekEnd;
    },
    nextWeekStart: function() {
      let nextWeekStart = new Date(this.thisWeekStart);
      nextWeekStart.setDate(this.thisWeekStart.getDate() + this.WEEK_LENGTH);
      return nextWeekStart;
    },
    nextWeekEnd: function() {
      let nextWeekEnd = new Date(this.today);
      nextWeekEnd.setDate(
        this.nextWeekStart.getDate() +
          this.WEEK_LENGTH -
          this.WEEK_BEGINS.MONDAY
      );
      return nextWeekEnd;
    },
    toggleLock: function() {
      if (this.showLastWeek && this.showNextWeek) this.showThisWeek = true;
    },
    setWeeks: function() {
      //weeks always start on monday.
      //set start dates via overwrite
      if (this.showNextWeek) this.localStart = this.nextWeekStart;
      if (this.showThisWeek) this.localStart = this.thisWeekStart;
      if (this.showLastWeek) this.localStart = this.lastWeekStart;
      //set end dates via overwrite
      if (this.showLastWeek) this.localEnd = this.lastWeekEnd;
      if (this.showThisWeek) this.localEnd = this.thisWeekEnd;
      if (this.showNextWeek) this.localEnd = this.nextWeekEnd;
      this.$emit("update:start", this.localStart);
      this.$emit("update:end", this.localEnd);
    }
  },
  methods: {
    toggleLastWeek: function() {
      this.showLastWeek = !this.showLastWeek;
      this.toggleLock;
      this.setWeeks;
    },
    toggleThisWeek: function() {
      if (this.showLastWeek && this.showNextWeek) this.showThisWeek = true;
      else this.showThisWeek = !this.showThisWeek;
      this.setWeeks;
    },
    toggleNextWeek: function() {
      this.showNextWeek = !this.showNextWeek;
      this.toggleLock;
      this.setWeeks;
    }
  },
  created: function() {
    this.setWeeks;
  }
};
</script>


<style lang="scss" scoped>
</style>
