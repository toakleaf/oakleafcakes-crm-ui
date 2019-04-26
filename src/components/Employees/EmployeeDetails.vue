<template>
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
          <tr>
            <td class="has-text-weight-semibold">Primary Email</td>
            <td v-if="!editing">{{props.row.email}}</td>
            <td v-if="editing">
              <input
                class="input is-small"
                type="text"
                v-model="email"
                placeholder="Email"
                :class="{'is-success': !$v.email.$invalid && email !== props.row.email, 'is-danger': $v.email.$error}"
                @blur="$v.email.$touch();"
                @input="checkForDuplicateEmail"
              >
            </td>
          </tr>
          <tr>
            <td class="has-text-weight-semibold">Primary Phone</td>
            <td v-if="!editing">{{props.row.phone}}</td>
            <td v-if="editing">
              <input
                class="input is-small"
                type="text"
                v-model="phone"
                placeholder="Phone"
                :class="{'is-success': !$v.phone.$invalid && phone !== props.row.phone, 'is-danger': $v.phone.$error}"
                @blur="$v.phone.$touch()"
              >
            </td>
          </tr>
          <tr>
            <td class="has-text-weight-semibold">Phone Type</td>
            <td v-if="!editing" class="is-capitalized">{{props.row.phone_type}}</td>
            <td v-if="editing">
              <span class="select is-small">
                <select v-model="phone_type" @change="$v.phone.$touch()">
                  <option value="mobile">Mobile</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                </select>
              </span>
            </td>
          </tr>
          <tr>
            <td class="has-text-weight-semibold">Phone Country</td>
            <td v-if="!editing">{{props.row.phone_country}}</td>
            <td v-if="editing">
              <p class="control has-icons-left">
                <span class="select is-small">
                  <select v-model="phone_country" @change="$v.phone.$touch()">
                    <option
                      v-for="region in regions"
                      v-bind:value="region"
                      :key="region"
                    >{{ region }}</option>
                  </select>
                </span>
                <span class="icon is-small is-left">
                  <i class="fas fa-globe"></i>
                </span>
              </p>
            </td>
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
      email: null,
      phoneInput: null,
      phone_type: null,
      phone_country: null,
      regions: listRegions,
      emailCheckedForDuplicate: null,
      timeout: null,
      emailIsUnique: true,
      checkingEmail: false,
      submitting: false
    };
  },
  computed: {
    phone: {
      get: function() {
        let ayt = PhoneNumber.getAsYouType(this.phone_country);
        ayt.reset(this.phoneInput);
        if (ayt.getPhoneNumber().a.valid) {
          return ayt.getPhoneNumber().a.number.national;
        }
        return this.phoneInput;
      },
      set: function(val) {
        this.phoneInput = val;
      }
    }
  },
  validations: {
    first_name: {
      required
    },
    last_name: {
      required
    },
    email: {
      required,
      email,
      unique: function(val) {
        if (!val || val === this.$store.getters.authorEmail) return true;
        return this.emailIsUnique;
      }
    },
    phone: {
      phone: function(val) {
        if (!val) return true;
        let ayt = PhoneNumber.getAsYouType(this.phone_country);
        ayt.reset(val);
        return ayt.getPhoneNumber().a.valid;
      }
    }
  },
  methods: {
    checkForDuplicateEmail: function() {
      if (!this.$v.email.email || this.email === this.emailCheckedForDuplicate)
        return; //only check valid emails, and don't recheck same email
      this.emailCheckedForDuplicate = this.email;

      clearTimeout(this.timeout); //resets the clock since last time this function was called (to avoid multiple calls in short timespan)
      this.checkingEmail = true;

      this.timeout = setTimeout(() => {
        axios
          .get(`/account/search/?exact=true&field=email&query=${this.email}`)
          .then(result => {
            if (result.data.length === 0) {
              this.emailIsUnique = true;
            } else {
              this.emailIsUnique = false; //ok
            }
            this.checkingEmail = false;
            this.$v.email.$touch(); //because async
          })
          .catch(err => {
            console.error("error: " + err);
          });
      }, 1000);
    },
    loadEmployeeData: function() {
      this.role = this.props.row.role;
      this.first_name = this.props.row.first_name;
      this.last_name = this.props.row.last_name;
      this.company_name = this.props.row.company_name;
      this.email = this.props.row.email;
      this.phone = this.props.row.phone;
      this.phone_type = this.props.row.phone_type;
      this.phone_country = this.props.row.phone_country;
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
          new_email: this.email,
          current_email: this.props.row.email,
          new_phone: this.phone,
          current_phone: this.props.row.phone,
          phone_type: this.phone_type,
          phone_country: this.phone_country,
          role: this.role,
          email_is_primary: true,
          phone_is_primary: true
        })
        .then(() => {
          this.$v.$reset();
          this.editing = false;
          this.$emit("submitted");
          this.submitting = false;
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
      this.submitting = true;
      axios
        .put(`/account/${this.props.row.id}`, {
          is_active: !this.props.row.is_active,
          current_email: this.props.row.email
        })
        .then(() => {
          this.$emit("submitted");
          this.submitting = false;
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
        })
        .catch(err => {
          console.error(err);
          alert("Failed to delete account.");
          this.submitting = false;
        });
    }
  },
  created() {
    this.loadEmployeeData();
  }
};
</script>
