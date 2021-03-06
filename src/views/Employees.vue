<template>
  <section class="pad-route">
    <div class="container">
      <div class="box">
        <h1 class="title">Employee Account Admin</h1>
        <h2 class="subtitle is-6">
          <a @click="addAccountModal">+ Add New</a>
        </h2>
        <div class="field is-grouped is-grouped-multiline">
          <p class="control">
            <b-switch v-model="showAdmin" @input="getAccounts()">Admins</b-switch>
          </p>
          <p class="control">
            <b-switch v-model="showEmployee" @input="getAccounts()">Employees</b-switch>
          </p>
          <p class="control">
            <b-switch v-model="showActive" type="is-link" @input="getAccounts()">Active Accounts</b-switch>
          </p>
          <p class="control">
            <b-switch v-model="showInactive" type="is-link" @input="getAccounts()">Inactive Accounts</b-switch>
          </p>
        </div>
        <b-table
          :data="accounts"
          mobile-cards
          narrowed
          striped
          :paginated="true"
          :per-page="20"
          :current-page.sync="currentPage"
          :pagination-simple="true"
          :opened-detailed="defaultOpenedDetails"
          detailed
          :detail-key="accounts.id"
          show-detail-icon
          icon-pack="fas"
        >
          <template slot-scope="props">
            <b-table-column field="id" label="ID" width="40" sortable numeric>
              <p :class="{'has-text-grey-light': !props.row.is_active}">{{ props.row.id }}</p>
            </b-table-column>
            <b-table-column field="first_name" label="First Name" sortable>
              <p :class="{'has-text-grey-light': !props.row.is_active}">{{ props.row.first_name }}</p>
            </b-table-column>
            <b-table-column field="last_name" label="Last Name" sortable>
              <p :class="{'has-text-grey-light': !props.row.is_active}">{{ props.row.last_name }}</p>
            </b-table-column>
            <b-table-column field="role" label="Role" sortable>
              <p :class="{'has-text-grey-light': !props.row.is_active}">{{ props.row.role }}</p>
            </b-table-column>
          </template>

          <template slot="detail" slot-scope="props">
            <div class="columns is-centered">
              <div class="column is-three-quarters-tablet">
                <app-account-card :account="props.row"/>
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/axiosAPI";
import AccountCard from "@/containers/AccountCard.vue";
import AddAccount from "@/containers/modals/AddAccount.vue";

export default {
  name: "employees",
  components: {
    "app-account-card": AccountCard
  },
  data: function() {
    return {
      accounts: [],
      showAddNewModal: false,
      defaultOpenedDetails: [],
      addNewFormErrors: [],
      currentPage: 1,
      showAdmin: true,
      showEmployee: true,
      showActive: true,
      showInactive: false
    };
  },
  methods: {
    getAccounts: function() {
      if (
        (!this.showAdmin && !this.showEmployee) ||
        (!this.showActive && !this.showInactive)
      )
        return (this.accounts = []);
      axios
        .get(
          `/account/search/?orderby=last_name${
            this.showAdmin ? "&role=ADMIN" : ""
          }${this.showEmployee ? "&role=EMPLOyEE" : ""}&active=${
            this.showActive
          }&inactive=${this.showInactive}`
        )
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
    },
    addAccountModal: function() {
      this.$modal.open({
        parent: this,
        component: AddAccount,
        hasModalCard: true,
        events: {
          "success-response": val => {
            this.getAccounts();
          }
        }
      });
    }
  },
  created: function() {
    this.getAccounts();
  }
};
</script>

<style lang="scss" scoped>
</style>

