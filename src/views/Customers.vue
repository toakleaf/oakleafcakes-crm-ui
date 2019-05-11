<template>
  <section class="container pad-route">
    <div class="box">
      {{$store.getters.currentCustomerLastName}}
      <app-search-bar/>
      <section>
        <b-tabs v-model="activeTab" size="is-small" type="is-boxed">
          <b-tab-item label="Details" icon-pack="fas" icon="info-circle">
            <app-details/>
          </b-tab-item>
          <b-tab-item label="Interactions" icon-pack="fas" icon="comments">
            <app-interactions/>
          </b-tab-item>
          <b-tab-item label="Orders" icon-pack="fas" icon="birthday-cake">
            <app-orders/>
          </b-tab-item>
          <b-tab-item label="Classes" icon-pack="fas" icon="graduation-cap">
            <app-classes/>
          </b-tab-item>
          <b-tab-item label="Appointments" icon-pack="fas" icon="calendar-alt">
            <app-classes/>
          </b-tab-item>
          <b-tab-item label="Paymentts" icon-pack="fas" icon="hand-holding-usd">
            <app-classes/>
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
  </section>
</template>
<script>
import SearchBar from "@/containers/Customers/SearchBar.vue";
import Details from "@/containers/Customers/Details.vue";
import Interactions from "@/containers/Customers/Interactions.vue";
import Orders from "@/containers/Customers/Orders.vue";
import Classes from "@/containers/Customers/Classes.vue";
import Payments from "@/containers/Customers/Payments.vue";
export default {
  name: "CustomerForm",
  data: function() {
    return {
      activeTab: 0
    };
  },
  components: {
    "app-search-bar": SearchBar,
    "app-details": Details,
    "app-interactions": Interactions,
    "app-orders": Orders,
    "app-classes": Classes,
    "app-payments": Payments
  }
};
</script>


<style lang="scss" scoped>
</style>


