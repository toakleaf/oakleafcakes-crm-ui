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
                <div class="box">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input class="input" type="text" placeholder="First Name">
                      <span class="icon is-left">
                        <i class="fas fa-user-astronaut"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input class="input is-success" type="text" placeholder="Last Name">
                      <span class="icon is-left">
                        <i class="fas fa-user-astronaut"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input class="input" type="text" placeholder="Company Name">
                      <span class="icon is-left">
                        <i class="fas fa-crow"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input class="input" type="text" placeholder="@mail">
                      <span class="icon is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input class="input" type="text" placeholder="Phone">
                      <span class="icon is-left">
                        <i class="fas fa-phone"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input class="input" type="text" placeholder="Password">
                      <span class="icon is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input class="input" type="text" placeholder="Password Confirm">
                      <span class="icon is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <div class="control">
                      <button class="button is-primary">Update Profile</button>
                    </div>
                  </div>
                </div>
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
            <b-table-column field="id" label="ID" width="40" numeric>{{ props.row.id }}</b-table-column>
            <b-table-column field="first_name" label="First Name">{{ props.row.first_name }}</b-table-column>
            <b-table-column field="last_name" label="Last Name">{{ props.row.last_name }}</b-table-column>
            <b-table-column field="role" label="Role">{{ props.row.role }}</b-table-column>
          </template>

          <template slot="detail" slot-scope="props">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  ID: {{ props.row.id }}
                  <br>
                  {{ props.row.first_name }}
                  {{ props.row.last_name }}
                  <br>
                  {{ props.row.company_name }}
                  <br>
                  {{ props.row.email }}
                  <br>
                  {{ props.row.phone }}
                  <br>
                  {{ props.row.role }}
                  <br>
                  <time>Created: {{ props.row.created_at.toLocaleString() }}</time>
                  <br>
                  <time>Last Updated: {{ props.row.updated_at.toLocaleString() }}</time>
                </div>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item">Edit Account</a>
                <a href="#" class="card-footer-item has-text-danger">Delete Account</a>
              </footer>
            </div>
          </template>
        </b-table>
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
      accounts: [],
      showAddNewModal: false,
      defaultOpenedDetails: []
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
    },
    toggleAddNewModal: function() {
      this.showAddNewModal = !this.showAddNewModal;
    }
  },
  created: function() {
    this.getAccounts();
  }
};
</script>

<style lang="scss" scoped>
</style>

