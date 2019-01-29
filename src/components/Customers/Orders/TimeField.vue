<template>
  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">{{label}}</label>
    </div>
    <div class="field-body">
      <app-time-picker
        :time.sync="localTime"
        color="is-dark"
        resetStyle="is-outlined"
        clearStyle="is-outlined"
        :size="size"
      ></app-time-picker>
    </div>
  </div>
</template>

<script>
import TimePicker from "@/components/widgets/TimePicker.vue";

export default {
  name: "TimePicker",
  components: {
    "app-time-picker": TimePicker
  },
  props: ["time", "label", "size"],
  computed: {
    localTime: {
      get: function() {
        return this.time;
      },
      set: function(t) {
        this.$emit("update:time", t);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
