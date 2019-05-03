<template>
  <div class="columns">
    <div class="column is-half-tablet">
      <b-collapse class="card" aria-id="contentIdForA11y3" v-if="customer">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p
            class="card-header-title"
          >{{customer.first_name ? (customer.first_name + ' ' + customer.last_name) : customer.company_name ? customer.company_name : null }}</p>
          <a class="card-header-icon">
            <span class="is-size-7 has-text-grey" style="margin-right: 1em;">{{customer.role}}</span>
            <b-icon :icon="props.open ? 'chevron-down' : 'chevron-up'" pack="fa"></b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <p>
              <span v-if="customer.first_name && customer.company_name" class="is-italic">
                {{customer.company_name}}
                <br>
              </span>

              <a :href="'mailto:' + customer.email">
                <span class="icon" v-if="customer.email_is_primary">
                  <i class="far fa-star"></i>
                </span>
                {{customer.email}}
              </a>
              <br>
              <span>
                <span class="icon" v-if="customer.phone_is_primary">
                  <i class="far fa-star"></i>
                </span>
                {{customer.phone}}
                <span
                  class="icon"
                  v-if="customer.phone_type && customer.phone_type.toLowerCase() === 'home'"
                >
                  <i class="fas fa-home"></i>
                </span>
                <span
                  class="icon"
                  v-if="customer.phone_type && customer.phone_type.toLowerCase() === 'mobile'"
                >
                  <i class="fas fa-mobile"></i>
                </span>
                <span
                  class="icon"
                  v-if="customer.phone_type && customer.phone_type.toLowerCase() === 'work'"
                >
                  <i class="fas fa-store"></i>
                </span>
                <span
                  class="icon"
                  v-if="customer.phone_type && customer.phone_type.toLowerCase() === 'emergency'"
                >
                  <i class="fas fa-ambulance"></i>
                </span>
              </span>
            </p>
            <p class="card-dates">
              <span class="is-size-7">Created: {{customerCreated.toLocaleString()}}</span>
              <span
                v-if="customerCreated.toLocaleString() !== customerUpdated.toLocaleString()"
                class="is-size-7"
              >
                <br>
                Updated: {{customerUpdated.toLocaleString()}}
              </span>
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">
            <span class="icon">
              <i class="fas fa-edit"></i>
            </span>
            Edit
          </a>
          <a class="card-footer-item">
            <span class="icon">
              <i class="far fa-plus-square"></i>
            </span>
            Email
          </a>
          <a class="card-footer-item">
            <span class="icon">
              <i class="far fa-plus-square"></i>
            </span>
            Phone
          </a>
        </footer>
      </b-collapse>
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
export default {
  name: "SecondaryInfo",
  components: {
    "app-billing-address": BillingAddress,
    "app-business-info": BusinessInfo,
    "app-associations": Associations
  },
  props: ["customer"],
  data: function() {
    return {};
  },
  computed: {
    customerCreated: function() {
      if (this.customer) return new Date(this.customer.created_at);
      return null;
    },
    customerUpdated: function() {
      if (this.customer) return new Date(this.customer.updated_at);
      return null;
    }
  }
};
</script>


<style lang="scss" scoped>
.card-dates {
  line-height: 90%;
  margin: 0 0 -1em 0;
}
</style>
