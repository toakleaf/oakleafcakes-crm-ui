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
          :value="showStartInput? startString : _start.toDateString()"
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
          :value="showEndInput? endString : _end.toDateString()"
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
      _start: this.start,
      _end: this.end,
      showStartInput: false,
      showEndInput: false,
      startInput: null,
      endInput: null,
      error: null
    };
  },
  watch: {
    start: function() {
      this._start = new Date(this.start);
      this._start.setHours(0, 0, 0, 0);
    },
    end: function() {
      this._end = new Date(this.end);
      this._end.setHours(0, 0, 0, 0);
    }
  },
  computed: {
    startString: function() {
      return `${this._start.getMonth() +
        1}/${this._start.getDate()}/${this._start.getFullYear() - 2000}`;
    },
    endString: function() {
      return `${this._end.getMonth() +
        1}/${this._end.getDate()}/${this._end.getFullYear() - 2000}`;
    },
    difference: function() {
      let diff =
        this._end -
        this._start +
        (this._start.getTimezoneOffset() - this._end.getTimezoneOffset()) *
          60 *
          1000;
      let oneDay = 1000 * 60 * 60 * 24;
      return Math.floor(diff / oneDay);
    }
  },
  methods: {
    updateStart: function() {
      try {
        this._start = new Date(this.startInput || this._start);
      } catch (err) {
        this.error = err;
      }
    },
    updateEnd: function() {
      try {
        this._end = new Date(this.endInput || this._end);
      } catch (err) {
        this.error = err;
      }
    },
    submit: function() {
      try {
        if (this.difference < 0) {
          const temp = this._start;
          this._start = this._end;
          this._end = temp;
        }
        if (Math.abs(this.difference) > 31) {
          // default to 1 week from start if out of bounds
          this._end = new Date(this._start);
          this._end.setDate(this._start.getDate() + 6);
        }
        this.$emit("update:start", this._start);
        this.$emit("update:end", this._end);
      } catch (err) {
        this.error = err;
      }
    },
    jumpBack: function() {
      try {
        if (this._start.getDate() === 1 && this._end.getDate() >= 28) {
          return this.jumpMonthBack();
        }
        this._start.setDate(
          this._start.getDate() - Math.abs(this.difference) - 1
        );
        this._end.setDate(this._end.getDate() - Math.abs(this.difference) - 1);
        this.$emit("update:start", this._start);
        this.$emit("update:end", this._end);
      } catch (err) {
        this.error = err;
      }
    },
    jumpAhead: function() {
      try {
        if (this._start.getDate() === 1 && this._end.getDate() >= 28) {
          return this.jumpMonthAhead();
        }
        this._start.setDate(
          this._start.getDate() + Math.abs(this.difference) + 1
        );
        this._end.setDate(this._end.getDate() + Math.abs(this.difference) + 1);
        this.$emit("update:start", this._start);
        this.$emit("update:end", this._end);
      } catch (err) {
        this.error = err;
      }
    },
    jumpMonthBack: function() {
      //order of execution is important
      this._end.setMonth(this._start.getMonth());
      this._end.setDate(0); //go back a day
      this._start.setMonth(this._start.getMonth() - 1);
      this.$emit("update:start", this._start);
      this.$emit("update:end", this._end);
    },
    jumpMonthAhead: function() {
      //order of execution is important
      this._end.setDate(1);
      this._end.setMonth(this._end.getMonth() + 2);
      this._end.setDate(0); //go back a day
      this._start.setMonth(this._start.getMonth() + 1);
      this.$emit("update:start", this._start);
      this.$emit("update:end", this._end);
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
