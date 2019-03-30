<template>
  <section class="pad-route">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <div class="box">
          <h1 class="title">Account Profile</h1>
          <div class="columns is-centered">
            <div class="column is-three-quarters">
              <div class="field">
                <label class="label">Account ID: {{id}}</label>
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
                  <input v-model="email" class="input" type="text" placeholder="@mail">
                  <span class="icon is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-primary">Update Profile</button>
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
export default {
  name: "profile",
  data: function() {
    return {
      stateChanged: false
    };
  },
  computed: {
    id: {
      get() {
        return this.$store.getters.authorID;
      },
      set(id) {
        this.$store.dispatch("setAuthorData", { id });
        this.stateChanged = true;
      }
    },
    firstName: {
      get() {
        return this.$store.getters.authorFirstName;
      },
      set(firstName) {
        this.$store.dispatch("setAuthorData", { firstName });
        this.stateChanged = true;
      }
    },
    lastName: {
      get() {
        return this.$store.getters.authorLastName;
      },
      set(lastName) {
        this.$store.dispatch("setAuthorData", { lastName });
        this.stateChanged = true;
      }
    },
    companyName: {
      get() {
        return this.$store.getters.authorCompanyName;
      },
      set(companyName) {
        this.$store.dispatch("setAuthorData", { companyName });
        this.stateChanged = true;
      }
    },
    email: {
      get() {
        return this.$store.getters.authorEmail;
      },
      set(email) {
        this.$store.dispatch("setAuthorData", { email });
        this.stateChanged = true;
      }
    },
    createdAt: {
      get() {
        return this.$store.getters.authorCreatedAt;
      },
      set(createdAt) {
        this.$store.dispatch("setAuthorData", { createdAt });
        this.stateChanged = true;
      }
    },
    updatedAt: {
      get() {
        return this.$store.getters.authorUpdatedAt;
      },
      set(updatedAt) {
        this.$store.dispatch("setAuthorData", { id });
        this.stateChanged = true;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.stateChanged === false) return next();
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

