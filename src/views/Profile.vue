<template>
  <section class="pad-route">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <div class="box">
          <h1 class="title">Account Profile</h1>
          <div class="columns is-centered">
            <div class="column is-three-quarters">
              <div class="field">
                <label class="label">Account ID: {{storeId}}</label>
              </div>
              <div class="field">
                <label class="label">First Name</label>
                <p class="control has-icons-left">
                  <input v-model="firstName" class="input" type="text" placeholder="First Name">
                  <span class="icon is-left">
                    <i class="fas fa-user-astronaut"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Last Name</label>
                <p class="control has-icons-left">
                  <input v-model="lastName" class="input" type="text" placeholder="Last Name">
                  <span class="icon is-left">
                    <i class="fas fa-user-astronaut"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Company Name</label>
                <p class="control has-icons-left">
                  <input v-model="companyName" class="input" type="text" placeholder="Company Name">
                  <span class="icon is-left">
                    <i class="fas fa-crow"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <p class="control has-icons-left">
                  <input v-model="storeEmail" class="input" type="text" placeholder="@mail">
                  <span class="icon is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button @click="pushUpdates" class="button is-primary">Update Profile</button>
                </div>
                <div class="control">
                  <button class="button is-text">change password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../axiosAPI";
export default {
  name: "profile",
  data: function() {
    return {
      unsavedChanges: false,
      password: null,
      passwordConfirm: null,
      id: null,
      first_name: null,
      last_name: null,
      company_name: null,
      email: null,
      created_at: null
    };
  },
  computed: {
    storeId: {
      get() {
        return this.$store.getters.authorID;
      },
      set(id) {
        this.id = id;
        this.unsavedChanges = true;
      }
    },
    firstName: {
      get() {
        return this.$store.getters.authorFirstName;
      },
      set(firstName) {
        this.first_name = firstName;
        this.unsavedChanges = true;
      }
    },
    lastName: {
      get() {
        return this.$store.getters.authorLastName;
      },
      set(lastName) {
        this.last_name = lastName;
        this.unsavedChanges = true;
      }
    },
    companyName: {
      get() {
        return this.$store.getters.authorCompanyName;
      },
      set(companyName) {
        this.company_name = companyName;
        this.unsavedChanges = true;
      }
    },
    storeEmail: {
      get() {
        return this.$store.getters.authorEmail;
      },
      set(email) {
        this.email = email;
        this.unsavedChanges = true;
      }
    },

    createdAt: {
      get() {
        return this.$store.getters.authorCreatedAt;
      },
      set(createdAt) {
        this.created_at = createdAt;
        this.unsavedChanges = true;
      }
    }
  },
  methods: {
    pushUpdates: function() {
      this.$store.dispatch("setAuthorData", {
        first_name: this.first_name,
        last_name: this.last_name,
        company_name: this.company_name,
        email: this.email
      });
      axios
        .put(`/account/${this.storeId}`, {
          first_name: this.first_name ? this.first_name : this.firstName,
          last_name: this.last_name ? this.last_name : this.lastName,
          company_name: this.company_name
            ? this.company_name
            : this.companyName,
          email: this.email ? this.email : this.storeEmail
        })
        .then(res => {
          this.unsavedChanges = false;
        })
        .catch(err => console.error(err));
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.unsavedChanges === false) return next();
    const answer = window.confirm(
      "Do you really want to leave? You have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

