<template>
  <section class="pad-route">
    <div class="container">
      <div class="box">
        <h1 class="title">Employee Accounts</h1>
        <h2 class="subtitle is-6">
          <a>+ Add New</a>
        </h2>
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>
                <input type="checkbox">
              </th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.id">
              <td>
                <input type="checkbox">
              </td>
              <td>{{ account.id }}</td>
              <td>{{ account.first_name }}</td>
              <td>{{ account.last_name }}</td>
              <td>{{ account.email }}</td>
              <td>{{ account.phone }}</td>
              <td>{{ account.role }}</td>
              <td>{{ account.created_at.toDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../axiosAPI";

export default {
  name: "admin",
  data: function() {
    return {
      accounts: []
    };
  },
  methods: {
    getAccounts: function() {
      axios
        .get("/account/search/?role=ADMIN&role=EMPLOYEE")
        .then(result => {
          this.accounts = result.data;
          for (let i = 0; i < this.accounts.length; i++) {
            this.accounts[i].created_at = new Date(this.accounts[i].created_at);
            this.accounts[i].updated_at = new Date(this.accounts[i].updated_at);
          }
        })
        .catch(err => console.error("error: " + err));
    }
  },
  created: function() {
    this.getAccounts();
  }
};
</script>

<style lang="scss" scoped>
</style>

