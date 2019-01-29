<template>
  <div class="field is-grouped is-grouped-centered is-grouped-multiline">
    <div class="field has-addons">
      <p class="control">
        <a @click="jumpBack" class="button">
          <span class="icon is-large">
            <i class="fas fa-lg fa-angle-double-left"></i>
          </span>
        </a>
      </p>
      <div class="control">
        <input
          @focus="showStartInput = !showStartInput"
          @keyup.enter="$event.currentTarget.blur()"
          @blur="showStartInput = !showStartInput; startInput = $event.target.value; updateStart()"
          class="input"
          type="text"
          :value="showStartInput? startString : localStart.toDateString()"
        >
      </div>
    </div>
    <div class="field has-addons">
      <div class="control">
        <input
          @focus="showEndInput = !showEndInput"
          @keyup.enter="$event.currentTarget.blur()"
          @blur="showEndInput = !showEndInput; endInput = $event.target.value; updateEnd();"
          class="input"
          type="text"
          :value="showEndInput? endString : localEnd.toDateString()"
        >
      </div>

      <p class="control">
        <a @click="jumpAhead" class="button">
          <span class="icon is-large">
            <i class="fas fa-lg fa-angle-double-right"></i>
          </span>
        </a>
      </p>
      <p @click="submit" class="button">
        <span class="icon">
          <i class="fas fa-lg fa-sync"></i>
        </span>
      </p>
    </div>
    <button v-if="error" class="button is-danger">{{error}}</button>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  props: ["start", "end"],
  data: function() {
    return {
      localStart: this.start,
      localEnd: this.end,
      showStartInput: false,
      showEndInput: false,
      startInput: null,
      endInput: null,
      error: null
    };
  },
  watch: {
    start: function() {
      this.localStart = new Date(this.start);
      this.localStart.setHours(0, 0, 0, 0);
    },
    end: function() {
      this.localEnd = new Date(this.end);
      this.localEnd.setHours(0, 0, 0, 0);
    }
  },
  computed: {
    startString: function() {
      return `${this.localStart.getMonth() +
        1}/${this.localStart.getDate()}/${this.localStart.getFullYear() -
        2000}`;
    },
    endString: function() {
      return `${this.localEnd.getMonth() +
        1}/${this.localEnd.getDate()}/${this.localEnd.getFullYear() - 2000}`;
    },
    difference: function() {
      let diff =
        this.localEnd -
        this.localStart +
        (this.localStart.getTimezoneOffset() -
          this.localEnd.getTimezoneOffset()) *
          60 *
          1000;
      let oneDay = 1000 * 60 * 60 * 24;
      return Math.floor(diff / oneDay);
    }
  },
  methods: {
    updateStart: function() {
      try {
        this.localStart = new Date(this.startInput || this.localStart);
      } catch (err) {
        this.error = err;
      }
    },
    updateEnd: function() {
      try {
        this.localEnd = new Date(this.endInput || this.localEnd);
      } catch (err) {
        this.error = err;
      }
    },
    submit: function() {
      try {
        if (this.difference < 0) {
          const temp = this.localStart;
          this.localStart = this.localEnd;
          this.localEnd = temp;
        }
        if (Math.abs(this.difference) > 31) {
          // default to 1 week from start if out of bounds
          this.localEnd = new Date(this.localStart);
          this.localEnd.setDate(this.localStart.getDate() + 6);
        }
        this.$emit("update:start", this.localStart);
        this.$emit("update:end", this.localEnd);
      } catch (err) {
        this.error = err;
      }
    },
    jumpBack: function() {
      try {
        if (this.localStart.getDate() === 1 && this.localEnd.getDate() >= 28) {
          return this.jumpMonthBack();
        }
        this.localStart.setDate(
          this.localStart.getDate() - Math.abs(this.difference) - 1
        );
        this.localEnd.setDate(
          this.localEnd.getDate() - Math.abs(this.difference) - 1
        );
        this.$emit("update:start", this.localStart);
        this.$emit("update:end", this.localEnd);
      } catch (err) {
        this.error = err;
      }
    },
    jumpAhead: function() {
      try {
        if (this.localStart.getDate() === 1 && this.localEnd.getDate() >= 28) {
          return this.jumpMonthAhead();
        }
        this.localStart.setDate(
          this.localStart.getDate() + Math.abs(this.difference) + 1
        );
        this.localEnd.setDate(
          this.localEnd.getDate() + Math.abs(this.difference) + 1
        );
        this.$emit("update:start", this.localStart);
        this.$emit("update:end", this.localEnd);
      } catch (err) {
        this.error = err;
      }
    },
    jumpMonthBack: function() {
      //order of execution is important
      this.localEnd.setMonth(this.localStart.getMonth());
      this.localEnd.setDate(0); //go back a day
      this.localStart.setMonth(this.localStart.getMonth() - 1);
      this.$emit("update:start", this.localStart);
      this.$emit("update:end", this.localEnd);
    },
    jumpMonthAhead: function() {
      //order of execution is important
      this.localEnd.setDate(1);
      this.localEnd.setMonth(this.localEnd.getMonth() + 2);
      this.localEnd.setDate(0); //go back a day
      this.localStart.setMonth(this.localStart.getMonth() + 1);
      this.$emit("update:start", this.localStart);
      this.$emit("update:end", this.localEnd);
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
