<template>
  <section class="pad-route">
    <div class="container">
      <div class="box">
        <h1 class="title">Employee Account Admin</h1>
        <h2 class="subtitle is-6">
          <a @click="toggleAddNewModal">+ Add New</a>
        </h2>
        <div class="modal" v-bind:class="{'is-active': showAddNewModal}">
          <div class="modal-background" @click="toggleAddNewModal"></div>
          <div class="modal-content">
            <div class="columns is-tablet is-centered">
              <div class="column is-half">
                <app-new-employee-form @submitted="newAccountAdded()"/>
              </div>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close" @click="toggleAddNewModal"></button>
        </div>
        <b-table
          :data="accounts"
          mobile-cards
          narrowed
          striped
          :opened-detailed="defaultOpenedDetails"
          detailed
          detail-key="id"
          show-detail-icon
          icon-pack="fas"
        >
          <template slot-scope="props">
            <b-table-column field="id" label="ID" width="40" numeric>
              <p :class="{'has-text-grey-light': !props.row.is_active}">{{ props.row.id }}</p>
            </b-table-column>
            <b-table-column field="first_name" label="First Name">
              <p :class="{'has-text-grey-light': !props.row.is_active}">{{ props.row.first_name }}</p>
            </b-table-column>
            <b-table-column field="last_name" label="Last Name">
              <p :class="{'has-text-grey-light': !props.row.is_active}">{{ props.row.last_name }}</p>
            </b-table-column>
            <b-table-column field="role" label="Role">
              <p :class="{'has-text-grey-light': !props.row.is_active}">{{ props.row.role }}</p>
            </b-table-column>
          </template>

          <template slot="detail" slot-scope="props">
            <app-employee-details :props="props" @submitted="getAccounts()"/>
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../axiosAPI";
import NewEmployeeForm from "@/components/Employees/NewEmployeeForm.vue";
import EmployeeDetails from "@/components/Employees/EmployeeDetails.vue";

export default {
  name: "employees",
  components: {
    "app-new-employee-form": NewEmployeeForm,
    "app-employee-details": EmployeeDetails
  },
  data: function() {
    return {
      accounts: [],
      showAddNewModal: false,
      defaultOpenedDetails: [],
      addNewFormErrors: []
    };
  },
  methods: {
    getAccounts: function() {
      axios
        .get("/account/search/?role=ADMIN&role=EMPLOYEE&orderby=last_name")
        .then(result => {
          this.accounts = result.data;
          for (let i = 0; i < this.accounts.length; i++) {
            this.accounts[i].created_at = new Date(this.accounts[i].created_at);
            this.accounts[i].updated_at = new Date(this.accounts[i].updated_at);
          }
        })
        .catch(err => console.error("error: " + err));
    },
    toggleAddNewModal: function() {
      this.showAddNewModal = !this.showAddNewModal;
    },
    newAccountAdded: function() {
      this.showAddNewModal = false;
      this.getAccounts();
    }
  },
  created: function() {
    this.getAccounts();
  }
};
</script>

<style lang="scss" scoped>
</style>

