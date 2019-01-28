<template>
  <div class="field is-horizontal common-fields">
    <div class="field-label is-normal">
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
          ></b-datepicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  props: ["date", "label"],
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
