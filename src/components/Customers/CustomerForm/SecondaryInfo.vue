<template>
  <div class="columns is-vcentered">
    <div class="column">
      <app-linked-customers/>
    </div>
    <div class="column">
      <app-linking-customers/>
    </div>
    <div class="column">
      <app-billing-address/>
    </div>
    <div class="column">
      <app-submit/>
    </div>
  </div>
</template>
<script>
import BillingAddress from "@/components/Customers/CustomerForm/BillingAddress.vue";
import LinkedCustomers from "@/components/Customers/CustomerForm/LinkedCustomers.vue";
import LinkingCustomers from "@/components/Customers/CustomerForm/LinkingCustomers.vue";
import Submit from "@/components/Customers/CustomerForm/Submit.vue";
export default {
  name: "SecondaryInfo",
  components: {
    "app-billing-address": BillingAddress,
    "app-linked-customers": LinkedCustomers,
    "app-linking-customers": LinkingCustomers,
    "app-submit": Submit
  }
};
</script>


<style lang="scss" scoped>
</style>
