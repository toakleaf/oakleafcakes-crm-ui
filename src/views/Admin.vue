<template>
  <section class="pad-route">
    <div class="container">
      <div class="box">
        <h1 class="title">System Administration</h1>
        <div class="box">
          <h2 class="subtitle">System Security</h2>
          <div class="field is-horizontal">
            <div class="field-label">
              <button
                class="button is-danger"
                @click="refreshJWTs()"
                :class="{'is-loading': submitting}"
              >Logout ALL Users</button>
            </div>
            <div class="field-body">
              <p>
                By clicking, you will reset the JSON Web Token (JWT) authorizations sitewide, and ALL accounts (admins, employees,
                and customers) will be forced to re-login to continue using site. This is disruptive to user experience, and therefore
                should be done only when you need to immediately deauthorize an account's (such as an employee) access, and
                can not wait for the natural expiration of the account's locally stored (in browser) JWT authorization.
              </p>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label">
              <div class="field has-addons has-addons-right">
                <p class="control">
                  <span class="select">
                    <select v-model="quantity">
                      <option v-for="n in 60" :key="n">{{n}}</option>
                    </select>
                  </span>
                </p>
                <p class="control">
                  <span class="select">
                    <select v-model="units">
                      <option value="s">seconds</option>
                      <option value="m">minutes</option>
                      <option value="h">hours</option>
                      <option value="d">days</option>
                      <option value="w">weeks</option>
                    </select>
                  </span>
                </p>
              </div>
              <button
                class="button is-primary"
                @click="changeSessionLength()"
                :class="{'is-loading': submitting}"
              >Update Session Length</button>
            </div>
            <div class="field-body">
              <p>
                Session length is the amount of time an account can remain logged in before needing to re-enter
                their credentials. Shorter lengths are more secure, but too short of lengths can be very inconvenient
                for users, especially customers who take longer to place an order.
                <strong>PLEASE NOTE:</strong> Updates to session length are
                NOT retroactive to already-logged in accounts. Therefore, if switching from a very long to shorter session
                length it is strongly recommended that you also mannually force the logout of all current user account sessions.
              </p>
              <p>{{quantity}}{{units}}</p>
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
  name: "admin",
  data: function() {
    return {
      submitting: false,
      quantity: null,
      units: null
    };
  },
  methods: {
    refreshJWTs: function() {
      let proceed = confirm(
        "Forcing the re-login of all accounts is very disruptive to the user experience. Do you wish to continue?"
      );
      if (!proceed) return;
      this.submitting = true;
      axios
        .post("/system/jwt/refresh")
        .then(() => {
          this.submitting = false;
          this.$store.dispatch("logout", true);
        })
        .catch(err => {
          alert("Failed to reset JWT's");
          console.error(err);
        });
    },
    changeSessionLength: function() {
      let proceed = confirm(
        "Are you sure you want to change the session length for all future account logins?"
      );
      if (!proceed) return;
      this.submitting = true;
      axios
        .put("/system/jwt/expires", {
          unit: this.units,
          quantity: this.quantity
        })
        .then(() => {
          this.$toast.open({
            message: "Successfully Updated Session Lengths!",
            type: "is-success"
          });
          this.units = null;
          this.quantity = null;
          this.submitting = false;
        })
        .catch(err => {
          alert("Failed to update session lengths.");
          console.error(err);
          this.submitting = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

