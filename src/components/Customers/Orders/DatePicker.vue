<template>
  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">{{label}}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <b-datepicker
            v-model="localDate"
            icon-pack="fas"
            icon="calendar-alt"
            placeholder="Type or select a date..."
            editable
            @input="update"
            :size="size"
          ></b-datepicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  props: ["date", "label", "size"],
  data: function() {
    return {
      localDate: this.date
    };
  },
  watch: {
    date: function() {
      this.localDate = this.date;
    }
  },
  methods: {
    update: function() {
      this.$emit("update:date", this.localDate);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
