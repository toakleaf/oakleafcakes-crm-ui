<template>
  <section class="section pad-navbar">
    <div class="container">
      <div class="box">
        <h1 class="title">Calendar</h1>
        <div class="buttons">
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
        {{start}} : {{end}}
        <app-week/>
      </div>
    </div>
  </section>
</template>
<script>
import Week from "@/components/Calendar/Week.vue";
export default {
  name: "calendar",
  components: {
    "app-week": Week
  },
  data: function() {
    return {
      today: new Date(),
      showThisWeek: true,
      showLastWeek: false,
      showNextWeek: false,
      start: null,
      end: null,
      counter: 1
    };
  },
  computed: {
    thisWeekStart: function() {
      let thisWeekStart = new Date(this.today);
      thisWeekStart.setDate(this.today.getDate() - this.today.getUTCDay() + 1);
      return thisWeekStart;
    },
    thisWeekEnd: function() {
      let thisWeekEnd = new Date(this.today);
      thisWeekEnd.setDate(this.thisWeekStart.getDate() + 6);
      return thisWeekEnd;
    },
    lastWeekStart: function() {
      let lastWeekStart = new Date(this.thisWeekStart);
      lastWeekStart.setDate(this.thisWeekStart.getDate() - 7);
      return lastWeekStart;
    },
    lastWeekEnd: function() {
      let lastWeekEnd = new Date(this.today);
      lastWeekEnd.setDate(this.lastWeekStart.getDate() + 6);
      return lastWeekEnd;
    },
    nextWeekStart: function() {
      let nextWeekStart = new Date(this.thisWeekStart);
      nextWeekStart.setDate(this.thisWeekStart.getDate() + 7);
      return nextWeekStart;
    },
    nextWeekEnd: function() {
      let nextWeekEnd = new Date(this.today);
      nextWeekEnd.setDate(this.nextWeekStart.getDate() + 6);
      return nextWeekEnd;
    },
    toggleLock: function() {
      if (this.showLastWeek && this.showNextWeek) this.showThisWeek = true;
    },
    setWeeks: function() {
      //weeks always start on monday.
      //set start dates via overwrite
      if (this.showNextWeek) this.start = this.nextWeekStart;
      if (this.showThisWeek) this.start = this.thisWeekStart;
      if (this.showLastWeek) this.start = this.lastWeekStart;
      //set end dates via overwrite
      if (this.showLastWeek) this.end = this.lastWeekEnd;
      if (this.showThisWeek) this.end = this.thisWeekEnd;
      if (this.showNextWeek) this.end = this.nextWeekEnd;
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
    this.setWeeks();
  }
};
</script>

<style lang="scss" >
</style>

