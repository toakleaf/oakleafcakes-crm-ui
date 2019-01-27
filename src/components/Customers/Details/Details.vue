<template>
  <div class="columns is-vcentered">
    <div class="column"></div>
    <div class="column"></div>
    <div class="column">
      <label class="label is-small">Billing Info</label>
      <app-billing-address/>
      <hr>
      <label class="label is-small">Business Info</label>
      <app-business-info/>
      <hr>
      <label class="label is-small">Associations</label>
      <app-associations/>
    </div>
  </div>
</template>
<script>
import BillingAddress from "@/components/widgets/BillingAddress.vue";
import BusinessInfo from "@/components/Customers/Details/BusinessInfo.vue";
import Associations from "@/components/Customers/Details/Associations.vue";
export default {
  name: "SecondaryInfo",
  components: {
    "app-billing-address": BillingAddress,
    "app-business-info": BusinessInfo,
    "app-associations": Associations
  }
};
</script>


<style lang="scss" scoped>
</style>
