<template>
  <b-collapse class="card" aria-id="contentIdForA11y3" v-if="currentCustomer">
    <div
      slot="trigger"
      slot-scope="props"
      class="card-header"
      role="button"
      aria-controls="contentIdForA11y3"
    >
      <p
        class="card-header-title"
      >{{currentCustomer.first_name ? (currentCustomer.first_name + ' ' + currentCustomer.last_name) : currentCustomer.company_name ? currentCustomer.company_name : null }}</p>
      <a class="card-header-icon">
        <span class="is-size-7 has-text-grey" style="margin-right: 1em;">{{currentCustomer.role}}</span>
        <b-icon :icon="props.open ? 'chevron-down' : 'chevron-up'" pack="fa"></b-icon>
      </a>
    </div>
    <div class="card-content">
      <div class="content">
        <p>
          <span v-if="currentCustomer.first_name && currentCustomer.company_name" class="is-italic">
            {{currentCustomer.company_name}}
            <br>
          </span>

          <a :href="'mailto:' + currentCustomer.email">
            <span class="icon" v-if="currentCustomer.email_is_primary">
              <i class="far fa-star"></i>
            </span>
            {{currentCustomer.email}}
          </a>
          <br>
          <span>
            <span class="icon" v-if="currentCustomer.phone_is_primary">
              <i class="far fa-star"></i>
            </span>
            {{currentCustomer.phone}}
            <span
              class="icon"
              v-if="currentCustomer.phone_type && currentCustomer.phone_type.toLowerCase() === 'home'"
            >
              <i class="fas fa-home"></i>
            </span>
            <span
              class="icon"
              v-if="currentCustomer.phone_type && currentCustomer.phone_type.toLowerCase() === 'mobile'"
            >
              <i class="fas fa-mobile"></i>
            </span>
            <span
              class="icon"
              v-if="currentCustomer.phone_type && currentCustomer.phone_type.toLowerCase() === 'work'"
            >
              <i class="fas fa-store"></i>
            </span>
            <span
              class="icon"
              v-if="currentCustomer.phone_type && currentCustomer.phone_type.toLowerCase() === 'emergency'"
            >
              <i class="fas fa-ambulance"></i>
            </span>
          </span>
        </p>
        <p class="card-dates">
          <span class="is-size-7">Created: {{currentCustomerCreatedAt.toLocaleString()}}</span>
          <span
            v-if="currentCustomerCreatedAt.toLocaleString() !== currentCustomerUpdatedAt.toLocaleString()"
            class="is-size-7"
          >
            <br>
            Updated: {{currentCustomerUpdatedAt.toLocaleString()}}
          </span>
        </p>
      </div>
    </div>
    <footer class="card-footer">
      <a
        class="card-footer-item"
        @click="setCurrentCustomer({...currentCustomer, first_name: 'stan', phone: '911'})"
      >
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
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "CustomerCard",
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
.card-dates {
  line-height: 90%;
  margin: 0 0 -1em 0;
}
</style>
