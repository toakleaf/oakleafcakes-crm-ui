<template>
  <div class="columns is-centered">
    <div class="column is-two-thirds">
      <h2
        v-if="!props.row.is_active"
        class="heading has-text-weight-semibold has-text-danger"
      >Account is currently deactivated</h2>
      <table class="table is-bordered no-background">
        <tbody>
          <tr>
            <td class="has-text-weight-semibold">ID</td>
            <td>{{props.row.id}}</td>
          </tr>
          <tr>
            <td class="has-text-weight-semibold">Is Active</td>
            <td class="is-capitalized">{{props.row.is_active}}</td>
          </tr>
          <tr>
            <td class="has-text-weight-semibold">Role</td>
            <td v-if="!editing">{{props.row.role}}</td>
            <td v-if="editing">
              <div class="block">
                <b-radio v-model="role" native-value="ADMIN" size="is-small">Admin</b-radio>
                <b-radio v-model="role" native-value="EMPLOYEE" size="is-small">Employee</b-radio>
                <b-radio v-model="role" native-value="CUSTOMER" size="is-small" type="is-danger">
                  <span :class="{'has-text-danger': role === 'CUSTOMER'}">Customer</span>
                </b-radio>
              </div>
            </td>
          </tr>
          <tr>
            <td class="has-text-weight-semibold">First Name</td>
            <td v-if="!editing">{{props.row.first_name}}</td>
            <td v-if="editing">
              <input
                class="input is-small"
                :class="{'is-success': !$v.first_name.$invalid && first_name !== props.row.first_name, 'is-danger': $v.first_name.$error}"
                type="text"
                v-model="first_name"
                placeholder="First Name"
                @blur="$v.first_name.$touch();"
              >
            </td>
          </tr>
          <tr>
            <td class="has-text-weight-semibold">Last Name</td>
            <td v-if="!editing">{{props.row.last_name}}</td>
            <td v-if="editing">
              <input
                class="input is-small"
                type="text"
                v-model="last_name"
                placeholder="Last Name"
                :class="{'is-success': !$v.last_name.$invalid && last_name !== props.row.last_name, 'is-danger': $v.last_name.$error}"
                @blur="$v.last_name.$touch();"
              >
            </td>
          </tr>
          <tr>
            <td class="has-text-weight-semibold">Company Name</td>
            <td v-if="!editing">{{props.row.company_name}}</td>
            <td v-if="editing">
              <input
                class="input is-small"
                type="text"
                v-model="company_name"
                placeholder="Company Name"
              >
            </td>
          </tr>
          <tr v-for="(email, i) in props.row.emails" :key="email.id + 'e'">
            <td class="has-text-weight-semibold">{{email.is_primary ? 'Primary ' : ''}} Email</td>
            <td v-if="!editing">{{email.email}}</td>
            <td v-if="editing">
              <p class="control is-small" :class="{'is-loading': emails[i].is_loading}">
                <input
                  class="input is-small"
                  type="text"
                  v-model="emails[i].email"
                  placeholder="@mail"
                  :class="{'is-success': !$v.emails.$each[i].email.$invalid && emails[i].email !== email.email , 'is-danger': $v.emails.$each[i].email.$error}"
                  @blur="$v.emails.$each[i].email.$touch();"
                  @input="checkForDuplicateEmail(i)"
                >
              </p>
            </td>
          </tr>
        </tbody>
        <template v-for="(phone, i) in props.row.phones">
          <tbody :key="phone.id + 'p'">
            <tr>
              <td class="has-text-weight-semibold">
                <span v-if="phone.is_primary">Primary{{' '}}</span>
                Phone
                <br>
                <span class="phone-indent">Country</span>
                <br>
                <span class="phone-indent">Type</span>
              </td>
              <td v-if="!editing">
                {{phone.phone}}
                <br>
                <span class="phone-indent">{{phone.phone_country}}</span>
                <br>
                <span class="phone-indent is-capitalized">{{phone.phone_type}}</span>
              </td>
              <td v-if="editing">
                <input
                  class="input is-small"
                  type="text"
                  :value="phones[i].phone"
                  @input="updatePhones($event.target.value, i)"
                  placeholder="Phone"
                  :class="{'is-success': !$v.phones.$each[i].$error && phones[i].phone !== phone.phone, 'is-danger': $v.phones.$each[i].$error}"
                  @blur="$v.phones.$each[i].$touch();"
                >
              </td>
            </tr>
          </tbody>
        </template>
        <tbody>
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
      <div class="field is-grouped is-grouped-multiline">
        <p class="control" v-if="!editing">
          <a class="button is-primary is-outlined" @click="editing = true">Edit Account Details</a>
        </p>
        <p class="control" v-if="editing">
          <button
            class="button is-primary"
            @click="pushUpdates()"
            :disabled="this.$v.$invalid"
            :class="{'is-loading': submitting}"
          >
            <span class="icon">
              <i class="far fa-save"></i>
            </span>
            <span>Save Changes</span>
          </button>
        </p>
        <p class="control" v-if="props.row.is_active && !editing">
          <button
            class="button is-danger is-outlined"
            @click="flipIsActive()"
            :class="{'is-loading': submitting}"
          >Deactivate Account</button>
        </p>
        <p class="control" v-if="!props.row.is_active && !editing">
          <button
            class="button is-dark is-outlined"
            @click="flipIsActive()"
            :class="{'is-loading': submitting}"
          >Reactivate Account</button>
        </p>
        <p class="control" v-if="props.row.is_active && editing">
          <button
            class="button is-danger is-outlined"
            :class="{'is-loading': submitting}"
            @click="resetAccount(false)"
          >Send Password Reset</button>
        </p>
        <p class="control">
          <button
            class="button is-danger is-outlined"
            :class="{'is-loading': submitting}"
            @click="resetAccount(true)"
          >Lock Account</button>
        </p>
        <p class="control" v-if="!props.row.is_active && !editing">
          <button
            class="button is-danger is-outlined"
            :class="{'is-loading': submitting}"
            @click="deleteAccount()"
          >Delete Account</button>
        </p>
        <p class="control" v-if="editing">
          <button @click="editing = false; loadEmployeeData()" class="button is-outlined">
            <span class="icon">
              <i class="fas fa-ban"></i>
            </span>
            <span>cancel edits</span>
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axiosAPI";
import { required, email } from "vuelidate/lib/validators";
let PhoneNumber = require("awesome-phonenumber");
let listCountries = PhoneNumber.getSupportedCallingCodes();
let listRegions = listCountries.map(c =>
  PhoneNumber.getRegionCodeForCountryCode(c)
);
listRegions = listRegions.sort().filter(item => item !== "001"); //removes the 001's

export default {
  name: "EmployeeDetails",
  props: ["props"],
  data: function() {
    return {
      editing: false,
      role: null,
      first_name: null,
      last_name: null,
      company_name: null,
      emails: null,
      phones: null,
      regions: listRegions,
      timeout: null,
      submitting: false
    };
  },
  computed: {},
  validations: {
    first_name: {
      required
    },
    last_name: {
      required
    },
    emails: {
      required,
      $each: {
        required,
        email: {
          email,
          unique: function(val) {
            if (!val) return true;
            const i = this.emails.findIndex(e => e.email === val);
            return this.emails[i].emailIsUnique;
          }
        }
      }
    },
    phones: {
      $each: {
        phone: function(val) {
          // console.log(val.phone);
          if (!val) return true;
          let ayt = PhoneNumber.getAsYouType(val.phone_country);
          ayt.reset(val.phone);
          return ayt.getPhoneNumber().a.valid && val.phone_country;
        }
      }
    }
  },
  methods: {
    updatePhones: function(val, i) {
      if (!this.phones) return;
      let ayt = PhoneNumber.getAsYouType(this.phones[i].phone_country);
      ayt.reset(val);
      if (ayt.getPhoneNumber().a.valid) {
        this.phones[i].phone = ayt.getPhoneNumber().a.number.national;
      } else this.phones[i].phone = val;
    },
    checkForDuplicateEmail: function(i) {
      this.emails[i].is_loading = false;
      if (
        !this.$v.emails.$each[i].email.email ||
        this.emails[i].email === this.props.row.emails[i].email
      ) {
        return; //only check valid emails, and don't recheck same email
      }

      clearTimeout(this.timeout); //resets the clock since last time this function was called (to avoid multiple calls in short timespan)
      this.emails[i].is_loading = true;

      this.timeout = setTimeout(() => {
        axios
          .get(
            `/account/search/?exact=true&field=email&query=${
              this.emails[i].email
            }`
          )
          .then(result => {
            this.emails[i].is_loading = false;
            if (
              result.data.length === 0 ||
              this.emails[i].email === this.props.row.emails[i].email
            ) {
              this.emails[i].emailIsUnique = true;
            } else {
              this.emails[i].emailIsUnique = false; //ok
            }
            this.$v.emails.$each[i].email.$touch(); //because async
          })
          .catch(err => {
            this.emails[i].is_loading = false;
            console.error("error: " + err);
          });
      }, 1000);
    },
    loadEmployeeData: function() {
      this.role = this.props.row.role;
      this.first_name = this.props.row.first_name;
      this.last_name = this.props.row.last_name;
      this.company_name = this.props.row.company_name;
      this.props.row.emails.sort((a, b) => (a.is_primary ? -1 : 1));
      this.emails = this.props.row.emails.map(e => {
        return { ...e, emailIsUnique: true, is_loading: false };
      });
      this.props.row.phones.sort((a, b) => (a.is_primary ? -1 : 1));
      //vue REALLY did not want me to copy by value. props kept getting modified locally.
      this.phones = this.props.row.phones.map(p => {
        return { ...p };
      });
      this.$v.$reset();
    },
    pushUpdates: function() {
      if (this.$v.$invalid) return;
      let proceed = confirm("Do you wish to permanently overwrite this data?");
      if (!proceed) return;
      this.submitting = true;
      axios
        .put(`/account/${this.props.row.id}`, {
          first_name: this.first_name,
          last_name: this.last_name,
          company_name: this.company_name,
          emails: [
            {
              new_email: this.email,
              current_email: this.props.row.email,
              is_primary: true
            }
          ],
          phones: [
            {
              new_phone: this.phone,
              current_phone: this.props.row.phone,
              phone_type: this.phone_type,
              phone_country: this.phone_country,
              is_primary: true
            }
          ],
          role: this.role
        })
        .then(() => {
          this.$v.$reset();
          this.editing = false;
          this.$emit("submitted");
          this.submitting = false;
          this.$toast.open({
            message: "Account Updated Successfully!",
            type: "is-success"
          });
        })
        .catch(err => {
          console.error(err);
          alert("Update Failed.");
          this.$v.$reset();
          this.editing = false;
          this.submitting = false;
          this.loadEmployeeData();
        });
    },
    flipIsActive: function() {
      let proceed = this.props.row.is_active
        ? confirm(
            "Deactivating an account will block a user's ability to login to the site.\n" +
              "If you have security conerns with this account's access, after downgrading the account's privilages " +
              "please consider Logging Out All Users from the system admin pannel to prevent user from logging in " +
              "with locally saved session token. Do you wish to continue?"
          )
        : confirm(
            "Activating an account will restore the user's access to the site. Are you sure you wish to proceed?"
          );
      if (!proceed) return;

      this.submitting = true;
      axios
        .put(`/account/${this.props.row.id}`, {
          is_active: !this.props.row.is_active,
          current_email: this.props.row.emails.filter(e => e.is_primary)[0]
            .email
        })
        .then(() => {
          this.$emit("submitted");
          this.submitting = false;
          this.$toast.open({
            message: "Account Settings Updated Successfully!",
            type: "is-success"
          });
        })
        .catch(err => {
          console.error(err);
          alert("Update Failed.");
          this.submitting = false;
        });
    },
    deleteAccount: function() {
      let proceed1 = confirm(
        "Are you ABSOLUTELY sure you want to delete this account? " +
          "It is STRONGLY suggested that you instead deactivate the account or change " +
          "the account role from 'EMPLOYEE' to 'CUSTOMER' to maintain the most consistent data history.\n\n" +
          "If you have security concerns with this account's access, after downgrading the account's privilages " +
          "please reset the JWT Secret Key in the /admin area " +
          "to imediately revoke access to all pre-existing browser tokens."
      );
      if (!proceed1) return;
      let proceed2 = confirm(
        "Last chance to turn back! Deleting accounts is permanent, and should only be done when the account " +
          "has not already made changes to other data. Do you really want to continue?"
      );
      if (!proceed2) return;
      this.submitting = true;
      axios
        .delete(`/account/${this.props.row.id}`)
        .then(res => {
          this.$emit("submitted");
          this.submitting = false;
          this.$toast.open({
            message: "Account Deleted Successfully!",
            type: "is-success"
          });
        })
        .catch(err => {
          console.error(err);
          alert("Failed to delete account.");
          this.submitting = false;
        });
    },
    resetAccount: function(lock) {
      let proceed = lock
        ? confirm(
            "Locking an account will delete the user's password without their notice, and will make the account inactive, " +
              "thus preventing them from logging into the site.\nIf security is a concern you should consider Logging Out All Users " +
              "from the system admin pannel to prevent account from logging in with the locally stored browser token. Do you wish to continue?"
          )
        : confirm(
            "You are about to delete the account's password. The user will be emailed a link to reset their password. " +
              "Are you sure you wish to proceed?"
          );
      if (!proceed) return;

      axios
        .delete("/account/password", {
          data: { email: this.props.row.email, lock }
        })
        .then(res => {
          this.$emit("submitted");
          this.submitting = false;
          lock
            ? this.$toast.open({
                message: "Account Locked Successfully!",
                type: "is-success"
              })
            : this.$toast.open({
                message: "Password Reset Sent!",
                type: "is-success"
              });
        })
        .catch(err => {
          console.error(err);
          alert("Failed to complete action.");
          this.submitting = false;
        });
    }
  },
  created() {
    this.loadEmployeeData();
  }
};
</script>

<style lang="scss" scoped>
.phone-indent {
  margin: 0 0 0 1em;
}
.no-background {
  background: none;
}
</style>

