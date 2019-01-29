<template>
  <div class="field has-addons">
    <div class="control">
      <div :class="['input', size]">
        <div class="select-container">
          <select v-model="hours" class="select-hours">
            <option :value="null" disabled hidden>––</option>
            <option v-for="n in hoursArray" :value="n" :key="n" :selected="hours">{{n}}</option>
          </select>
          <span>:</span>
          <select v-model="minutes">
            <option :value="null" disabled hidden>––</option>
            <option v-for="n in minutesArray" :value="n" :key="n" :selected="minutes">{{n}}</option>
          </select>
          <select v-model="meridiem">
            <option :value="null" disabled hidden>––</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    </div>
    <div class="control">
      <a @click="setToNow(); " :class="['button', resetStyle, size, color]">Now</a>
    </div>
    <div class="control">
      <a @click="clearTime(); " :class="['button', clearStyle, size, color]">clear</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimePicker",
  props: ["time", "size", "color", "resetStyle", "clearStyle"],
  data: function() {
    return {
      localTime: null
    };
  },
  watch: {
    time: {
      immediate: true,
      handler(nv, ov) {
        const t = nv;
        if (t) {
          if (t.getMinutes() > 57) {
            // fix rollover when rounding
            t.setMinutes(61);
          }
          t.setMinutes(this.roundToNearest5(t.getMinutes()));
        }

        this.localTime = t;
      }
    },
    localTime: function(nv, ov) {
      this.$emit("update:time", nv);
    }
  },
  computed: {
    minutesArray: function() {
      let mins = [];
      for (let i = 0; i < 12; i++) {
        const n = i * 5;
        mins.push(n < 10 ? "0" + n.toString() : n.toString());
      }
      return mins;
    },
    hoursArray: function() {
      return [...Array(12).keys()].map(x => (++x).toString());
    },
    hours: {
      get: function() {
        if (!this.localTime) return null;
        const t = this.localTime.toLocaleString("en-US", {
          hour: "numeric",
          hour12: true
        });

        return t.substring(0, t.length - 3);
      },
      set: function(str) {
        let t = null;
        if (!this.localTime) t = new Date(`1/1/1970 00:00 AM`);
        else t = new Date(this.localTime);
        if (this.meridiem === "AM") {
          if (str === "12") {
            t.setHours(0);
          } else {
            t.setHours(parseInt(str));
          }
        } else {
          if (str === "12") {
            t.setHours(12);
          } else {
            t.setHours(parseInt(str) + 12);
          }
        }
        this.localTime = t;
      }
    },
    minutes: {
      get: function() {
        if (!this.localTime) return null;
        return this.localTime.getMinutes() < 10
          ? "0" + this.localTime.getMinutes().toString()
          : this.localTime.getMinutes().toString();
      },
      set: function(str) {
        if (!this.localTime) {
          this.hours = "12";
        }
        const t = new Date(this.localTime);
        t.setMinutes(parseInt(str));
        this.localTime = t;
      }
    },
    meridiem: {
      get: function() {
        if (!this.localTime) return null;
        const h = this.localTime.toLocaleString("en-US", {
          hour: "numeric",
          hour12: true
        });
        return h.substring(h.length - 2, h.length);
      },
      set: function(str) {
        if (!this.localTime) {
          this.hours = "12";
          this.minutes = "00";
        }
        const d = this.localTime.toLocaleString("en-US");
        const sub = d.substring(0, d.length - 2) + str;
        this.localTime = new Date(sub);
      }
    }
  },
  methods: {
    roundToNearest5: function(n) {
      return n % 5 >= 2.5 ? parseInt(n / 5) * 5 + 5 : parseInt(n / 5) * 5;
    },
    setToNow: function() {
      const d = new Date();
      if (d.getMinutes() > 57) {
        d.setMinutes(61);
      }
      d.setHours(d.getHours(), this.roundToNearest5(d.getMinutes()), 0, 0);
      this.localTime = d;
    },
    clearTime: function() {
      this.localTime = null;
    }
  }
};
</script>

<style lang="scss" scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  border: 0;
  padding: 0 0.25em 0 0.25em;
  background-color: inherit;
}
.select-container {
  margin-right: 10px;
  min-width: 6em;
}
.select-hours {
  text-align-last: right;
}
</style>
