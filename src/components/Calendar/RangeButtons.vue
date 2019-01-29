<template>
  <div class="buttons is-centered">
    <a class="button is-dark" :class="{'is-outlined': !showToday}" @click="toggleToday">Today</a>
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
    <a
      class="button is-dark"
      :class="{'is-outlined': !showThisMonth}"
      @click="toggleThisMonth"
    >This Month</a>
  </div>
</template>

<script>
export default {
  name: "RangeButtons",
  props: ["start", "end"],
  data: function() {
    return {
      showToday: false,
      showThisWeek: true,
      showLastWeek: false,
      showNextWeek: false,
      showThisMonth: false,
      localStart: null,
      localEnd: null,
      WEEK_BEGINS: "MONDAY",
      WEEK_DAYS: {
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
      if (this.start != this.localStart) {
        this.clearWeekButtons();
        this.clearTodayButton();
        this.clearMonthButton();
      }
    },
    end: function() {
      if (this.end != this.localEnd) {
        this.clearWeekButtons();
        this.clearTodayButton();
        this.clearMonthButton();
      }
    }
  },
  computed: {
    today: function() {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return now;
    },
    thisWeekStart: function() {
      let thisWeekStart = new Date("2/1/19");
      thisWeekStart.setDate(
        this.WEEK_DAYS[this.WEEK_BEGINS] - thisWeekStart.getDay() + 1
      );
      return thisWeekStart;
    },
    thisWeekEnd: function() {
      let thisWeekEnd = new Date(this.thisWeekStart);
      thisWeekEnd.setDate(this.thisWeekStart.getDate() + this.WEEK_LENGTH - 1);
      return thisWeekEnd;
    },
    lastWeekStart: function() {
      let lastWeekStart = new Date(this.thisWeekStart);
      lastWeekStart.setDate(this.thisWeekStart.getDate() - this.WEEK_LENGTH);
      return lastWeekStart;
    },
    lastWeekEnd: function() {
      let lastWeekEnd = new Date(this.lastWeekStart);
      lastWeekEnd.setDate(this.lastWeekStart.getDate() + this.WEEK_LENGTH - 1);
      return lastWeekEnd;
    },
    nextWeekStart: function() {
      let nextWeekStart = new Date(this.thisWeekEnd);
      nextWeekStart.setDate(this.thisWeekEnd.getDate() + 1);
      return nextWeekStart;
    },
    nextWeekEnd: function() {
      let nextWeekEnd = new Date(this.nextWeekStart);
      nextWeekEnd.setDate(this.nextWeekStart.getDate() + this.WEEK_LENGTH - 1);
      return nextWeekEnd;
    },
    thisMonthStart: function() {
      let thisMonthStart = new Date(this.today);
      thisMonthStart.setDate(1);
      return thisMonthStart;
    },
    thisMonthEnd: function() {
      let thisMonthEnd = new Date(this.today);
      thisMonthEnd.setDate(1);
      thisMonthEnd.setMonth(thisMonthEnd.getMonth() + 1);
      thisMonthEnd.setDate(0);
      return thisMonthEnd;
    }
  },
  methods: {
    toggleLock: function() {
      if (this.showLastWeek && this.showNextWeek) this.showThisWeek = true;
    },
    setWeeks: function() {
      this.clearTodayButton();
      this.clearMonthButton();
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
    },
    clearWeekButtons: function() {
      this.showLastWeek = false;
      this.showThisWeek = false;
      this.showNextWeek = false;
    },
    clearTodayButton: function() {
      this.showToday = false;
    },
    clearMonthButton: function() {
      this.showThisMonth = false;
    },
    toggleToday: function() {
      this.showToday = !this.showToday;
      this.clearWeekButtons();
      this.clearMonthButton();
      this.localStart = this.today;
      this.localEnd = this.today;
      this.$emit("update:start", this.localStart);
      this.$emit("update:end", this.localEnd);
    },
    toggleThisMonth: function() {
      this.clearWeekButtons();
      this.clearTodayButton();
      this.showThisMonth = !this.showThisMonth;
      if (!this.showThisMonth) return;
      this.localStart = this.thisMonthStart;
      this.localEnd = this.thisMonthEnd;
      this.$emit("update:start", this.localStart);
      this.$emit("update:end", this.localEnd);
    },
    toggleLastWeek: function() {
      this.showLastWeek = !this.showLastWeek;
      this.toggleLock();
      this.setWeeks();
    },
    toggleThisWeek: function() {
      this.showThisWeek = !this.showThisWeek;
      this.toggleLock();
      this.setWeeks();
    },
    toggleNextWeek: function() {
      this.showNextWeek = !this.showNextWeek;
      this.toggleLock();
      this.setWeeks();
    }
  },
  created: function() {
    this.setWeeks();
  }
};
</script>


<style lang="scss" scoped>
</style>
