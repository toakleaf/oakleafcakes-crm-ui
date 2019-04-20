<template>
  <section class="pad-route">
    <div class="container">
      <div class="box">
        <h1 class="title">Employee Accounts</h1>
        <h2 class="subtitle is-6">
          <a @click="toggleAddNewModal">+ Add New</a>
        </h2>
        <div class="modal" v-bind:class="{'is-active': showAddNewModal}">
          <div class="modal-background" @click="toggleAddNewModal"></div>
          <div class="modal-content">
            <div class="columns is-tablet is-centered">
              <div class="column is-half">
                <app-new-employee-form @success="newAccountAdded()"/>
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
            <div class="columns is-centered">
              <div class="column is-two-thirds">
                <h2
                  v-if="!props.row.is_active"
                  class="heading has-text-weight-semibold has-text-danger"
                >Account is currently deactivated</h2>
                <table class="table is-bordered">
                  <tbody>
                    <tr>
                      <td class="has-text-weight-semibold">ID</td>
                      <td>{{props.row.id}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Is Active</td>
                      <td>{{props.row.is_active}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Role</td>
                      <td>{{props.row.role}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">First Name</td>
                      <td>{{props.row.first_name}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Last Name</td>
                      <td>{{props.row.last_name}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Company Name</td>
                      <td>{{props.row.company_name}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Primary Email</td>
                      <td>{{props.row.email}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Primary Phone</td>
                      <td>{{props.row.phone}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Phone Type</td>
                      <td>{{props.row.phone_type}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Phone Country</td>
                      <td>{{props.row.phone_country}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Account Created</td>
                      <td>{{props.row.created_at.toLocaleString()}}</td>
                    </tr>
                    <tr>
                      <td class="has-text-weight-semibold">Account Last Updated</td>
                      <td>{{props.row.updated_at.toLocaleString()}}</td>
                    </tr>
                  </tbody>
                </table>
                <br>
                <div class="field is-grouped">
                  <p class="control">
                    <a class="button is-primary is-outlined">Edit Account Details</a>
                  </p>
                  <p class="control">
                    <a
                      class="button is-danger is-outlined"
                      v-if="props.row.is_active"
                    >Deactivate Account</a>
                  </p>
                  <p class="control">
                    <a
                      class="button is-dark is-outlined"
                      v-if="!props.row.is_active"
                    >Reactivate Account</a>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../axiosAPI";
import NewEmployeeForm from "@/components/Admin/NewEmployeeForm.vue";

export default {
  name: "admin",
  components: {
    "app-new-employee-form": NewEmployeeForm
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

