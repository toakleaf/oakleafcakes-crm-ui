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
                <label class="label">Display Name</label>
                <p class="control has-icons-left">
                  <input v-model="displayName" class="input" type="text" placeholder="Display Name">
                  <span class="icon is-left">
                    <i class="fas fa-crow"></i>
                  </span>
                </p>
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
  computed: {
    id: {
      get() {
        return this.$store.getters.accountID;
      },
      set(id) {
        this.$store.dispatch("setAccountData", { id });
      }
    },
    firstName: {
      get() {
        return this.$store.getters.accountFirstName;
      },
      set(firstName) {
        this.$store.dispatch("setAccountData", { firstName });
      }
    },
    lastName: {
      get() {
        return this.$store.getters.accountLastName;
      },
      set(lastName) {
        this.$store.dispatch("setAccountData", { lastName });
      }
    },
    displayName: {
      get() {
        return this.$store.getters.accountDisplayName;
      },
      set(displayName) {
        this.$store.dispatch("setAccountData", { displayName });
      }
    },
    email: {
      get() {
        return this.$store.getters.accountEmail;
      },
      set(email) {
        this.$store.dispatch("setAccountData", { email });
      }
    },
    createdAt: {
      get() {
        return this.$store.getters.accountCreatedAt;
      },
      set(createdAt) {
        this.$store.dispatch("setAccountData", { createdAt });
      }
    },
    updatedAt: {
      get() {
        return this.$store.getters.accountUpdatedAt;
      },
      set(updatedAt) {
        this.$store.dispatch("setAccountData", { id });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
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

