<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <div class="box has-background-white-ter">
        <div class="column">
          <app-date-picker :date.sync="dueDate" label="Due Date"/>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"></label>
            </div>
            <div class="field-body">
              <b-switch
                :value="showEventDate"
                @input="showEventDate = !showEventDate"
              >Event Date is different</b-switch>
            </div>
          </div>
          <b-collapse :open="showEventDate">
            <app-date-picker :date.sync="dueDate" label="Event Date"/>
          </b-collapse>
          <!-- here -->
          <app-time-picker :time.sync="eventTime" label="Event Time"/>
        </div>

        <b-tabs position="is-centered" class="is-marginless">
          <b-tab-item label="Pick up">
            <app-time-picker :time.sync="dueTime" label="Pickup Time"/>
          </b-tab-item>
          <b-tab-item label="Delivery">
            <app-time-picker :time.sync="dueTime" label="Deliver From"/>
            <app-time-picker :time.sync="dueTimeEnd" label="Deliver To"/>
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
import TimePicker from "@/components/Customers/Orders/TimePicker.vue";
import DatePicker from "@/components/Customers/Orders/DatePicker.vue";

export default {
  name: "OrderForm",
  components: {
    "app-gourmet": Gourmet,
    "app-time-picker": TimePicker,
    "app-date-picker": DatePicker
  },
  data: function() {
    return {
      showEventDate: false,
      dueDate: null,
      eventDate: null,
      dueTime: null,
      dueTimeEnd: null,
      eventTime: null
    };
  }
};
</script>


<style lang="scss" scoped>
.common-fields {
  padding: 0 0.25em 5px 0.25em;
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
