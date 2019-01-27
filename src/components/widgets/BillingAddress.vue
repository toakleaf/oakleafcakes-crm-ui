<template>
  <div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="Billing Address">
        <span class="icon is-small is-left">
          <i class="far fa-address-card"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="Billing City">
        <span class="icon is-small is-left">
          <i class="far fa-address-card"></i>
        </span>
      </p>
    </div>
    <div class="field has-addons">
      <app-state-selector/>
      <span class="select is-small">
        <select>
          <option>US</option>
          <option>EU</option>
          <option>UK</option>
        </select>
      </span>
      <p class="control is-expanded">
        <input class="input is-small" type="text" placeholder="Billing Zip">
      </p>
    </div>
  </div>
</template>
<script>
import StateSelector from "@/components/widgets/StateSelector.vue";
export default {
  name: "BillingAddress",
  components: {
    "app-state-selector": StateSelector
  }
};
</script>


<style lang="scss" scoped>
</style>

