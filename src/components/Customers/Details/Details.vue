<template>
  <div class="columns">
    <div class="column is-half-tablet">
      <app-account-card :account="currentCustomer"/>
    </div>
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
import AccountCard from "@/components//widgets/AccountCard.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "SecondaryInfo",
  components: {
    "app-billing-address": BillingAddress,
    "app-business-info": BusinessInfo,
    "app-associations": Associations,
    "app-account-card": AccountCard
  },
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters([
      "currentCustomer",
      "currentCustomerCreatedAt",
      "currentCustomerUpdatedAt"
    ])
  },
  methods: {
    ...mapActions([
      "fetchCurrentCustomer",
      "setCurrentCustomer",
      "clearCurrentCustomer"
    ])
  }
};
</script>


<style lang="scss" scoped>
</style>
