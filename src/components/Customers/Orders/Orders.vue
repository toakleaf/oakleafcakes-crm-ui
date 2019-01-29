<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <div class="box has-background-white-ter">
        <div class="column">
          <app-date-picker :date.sync="dueDate" :size="size" label="Due Date"/>
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label"></label>
            </div>
            <div class="field-body">
              <b-switch
                :value="showEventDate"
                @input="showEventDate = !showEventDate"
                :size="size"
              >Event Date is different</b-switch>
            </div>
          </div>
          <b-collapse :open="showEventDate" :class="{'b-collapse': showEventDate}">
            <app-date-picker :date.sync="dueDate" label="Event Date" :size="size"/>
          </b-collapse>
          <app-time-field :time.sync="eventTime" label="Event Time" :size="size"/>
        </div>

        <b-tabs position="is-centered" class="is-marginless">
          <b-tab-item label="Pick up">
            <app-time-field :time.sync="dueTime" label="Pickup Time" :size="size"/>
          </b-tab-item>
          <b-tab-item label="Delivery">
            <app-time-field :time.sync="dueTime" label="Deliver From" :size="size"/>
            <app-time-field :time.sync="dueTimeEnd" label="Deliver To" :size="size"/>
          </b-tab-item>
        </b-tabs>

        <b-tabs position="is-centered" class="is-marginless">
          <b-tab-item label="Gourmet">
            <app-gourmet></app-gourmet>
          </b-tab-item>
          <b-tab-item label="Designer"></b-tab-item>
          <b-tab-item label="Custom"></b-tab-item>
          <b-tab-item label="Wedding"></b-tab-item>
          <b-tab-item label="Baked Goods"></b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Gourmet from "@/components/Customers/Orders/Gourmet.vue";
import TimeField from "@/components/Customers/Orders/TimeField.vue";
import DatePicker from "@/components/Customers/Orders/DatePicker.vue";

export default {
  name: "OrderForm",
  components: {
    "app-gourmet": Gourmet,
    "app-time-field": TimeField,
    "app-date-picker": DatePicker
  },
  data: function() {
    return {
      showEventDate: false,
      dueDate: null,
      eventDate: null,
      dueTime: null,
      dueTimeEnd: null,
      eventTime: null,
      size: ""
    };
  }
};
</script>


<style lang="scss" scoped>
.b-collapse {
  padding: 0 0 1em 0;
}
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
</style>
