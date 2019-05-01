<template>
  <section class="container pad-route">
    <div class="box">
      <app-top-matter/>
      <section>
        <!-- <b-icon pack="fas" icon="user" class="is-pulled-right"></b-icon> -->
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
import TopMatter from "@/components/Customers/TopMatter/TopMatter.vue";
import Details from "@/components/Customers/Details/Details.vue";
import Interactions from "@/components/Customers/Interactions/Interactions.vue";
import Orders from "@/components/Customers/Orders/Orders.vue";
import Classes from "@/components/Customers/Classes/Classes.vue";
import Payments from "@/components/Customers/Payments/Payments.vue";
export default {
  name: "CustomerForm",
  data: function() {
    return {
      activeTab: 0
    };
  },
  components: {
    "app-top-matter": TopMatter,
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


