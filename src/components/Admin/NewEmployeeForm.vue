<template>
  <div class="box">
    <div class="block">
      <b-radio v-model="role" native-value="ADMIN">Admin</b-radio>
      <b-radio v-model="role" native-value="EMPLOYEE">Employee</b-radio>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          :class="{'is-success': !$v.first_name.$invalid, 'is-danger': $v.first_name.$error}"
          type="text"
          placeholder="First Name"
          v-model="first_name"
          @blur="$v.first_name.$touch()"
        >
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
        <input
          class="input"
          :class="{'is-success': !$v.last_name.$invalid, 'is-danger': $v.last_name.$error}"
          type="text"
          placeholder="Last Name"
          v-model="last_name"
          @blur="$v.last_name.$touch()"
        >
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
        <input class="input" type="text" placeholder="Company Name" v-model="company_name">
        <span class="icon is-left">
          <i class="fas fa-crow"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p
        class="control has-icons-left"
        :class="{'is-loading': checkingEmail, 'has-icons-right': !checkingEmail}"
      >
        <input
          class="input"
          :class="{'is-success': !$v.email.$invalid, 'is-danger': $v.email.$error}"
          type="text"
          placeholder="@mail"
          v-model="email"
          @blur="$v.email.$touch();"
          @input="checkForDuplicateEmail"
        >
        <span class="icon is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span v-if="!checkingEmail" class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field has-addons">
      <p class="control has-icons-left is-expanded">
        <input
          class="input"
          :class="{'is-success': !$v.phone.$invalid && phoneInput, 'is-danger': $v.phone.$error}"
          type="text"
          placeholder="Phone"
          v-model="phone"
          @blur="$v.phone.$touch()"
        >
        <span class="icon is-left">
          <i class="fas fa-phone"></i>
        </span>
      </p>
      <p class="control">
        <span class="select">
          <select v-model="phone_type" @change="$v.phone.$touch()">
            <option value="mobile">Mobile</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
          </select>
        </span>
      </p>
      <p class="control has-icons-left">
        <span class="select">
          <select v-model="country" @change="$v.phone.$touch()">
            <option v-for="region in regions" v-bind:value="region" :key="region">{{ region }}</option>
          </select>
        </span>
        <span class="icon is-small is-left">
          <i class="fas fa-globe"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          :class="{'is-success': !$v.password.$invalid, 'is-danger': $v.password.$error}"
          type="password"
          placeholder="Password"
          v-model="password"
          @blur="$v.password.$touch()"
        >
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
        <input
          class="input"
          :class="{'is-success': !$v.confirmPassword.$invalid, 'is-danger': $v.confirmPassword.$error}"
          type="password"
          placeholder="Confirm Password"
          v-model="confirmPassword"
          @blur="$v.confirmPassword.$touch()"
        >
        <span class="icon is-left">
          <i class="fas fa-lock"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field is-grouped">
      <p class="control">
        <button
          class="button is-primary"
          :class="{'is-loading': submitting}"
          :disabled="$v.$invalid"
          @click="submitForm"
        >Create New Account</button>
      </p>
      <p class="control">
        <button class="button" @click="clearFields">Clear Fields</button>
      </p>
    </div>
    <p class="is-danger" v-if="error">{{error}}</p>
  </div>
</template>

<script>
import axios from "../../axiosAPI";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
let PhoneNumber = require("awesome-phonenumber");
let listCountries = PhoneNumber.getSupportedCallingCodes();
let listRegions = listCountries.map(c =>
  PhoneNumber.getRegionCodeForCountryCode(c)
);
listRegions = listRegions.sort().filter(item => item !== "001"); //removes the 001's

export default {
  name: "NewEmployeeForm",
  data: function() {
    return {
      first_name: null,
      last_name: null,
      company_name: null,
      email: null,
      role: "EMPLOYEE",
      password: null,
      confirmPassword: null,
      regions: listRegions,
      country: "US",
      phone_type: "mobile",
      phoneInput: null,
      checkingEmail: false,
      emailCheckedForDuplicate: null,
      emailIsUnique: true,
      timeout: null,
      submitting: false,
      error: null
    };
  },
  computed: {
    phone: {
      set: function(val) {
        this.phoneInput = val;
      },
      get: function() {
        let ayt = PhoneNumber.getAsYouType(this.country);
        ayt.reset(this.phoneInput);
        if (ayt.getPhoneNumber().a.valid) {
          return ayt.getPhoneNumber().a.number.national;
        }
        return this.phoneInput;
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
        if (!val) return true;
        return this.emailIsUnique;
      }
    },
    phone: {
      phone: function(val) {
        if (!val) return true;
        let ayt = PhoneNumber.getAsYouType(this.country);
        ayt.reset(val);
        return ayt.getPhoneNumber().a.valid;
      }
    },
    password: {
      required,
      minLen: minLength(12)
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password")
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
    clearFields: function() {
      this.first_name = null;
      this.last_name = null;
      this.company_name = null;
      this.email = null;
      this.role = "EMPLOYEE";
      this.password = null;
      this.confirmPassword = null;
      this.country = "US";
      this.phoneInput = null;
      this.phone_type = "mobile";
      this.checkingEmail = false;
      this.emailCheckedForDuplicate = null;
      this.emailIsUnique = true;
      this.timeout = null;
      this.submitting = false;
      this.$v.$reset();
    },
    submitForm: function() {
      this.submitting = true;
      if (this.$v.$invalid) return;
      axios
        .post(`/account/register/`, {
          first_name: this.first_name,
          last_name: this.last_name,
          company_name: this.company_name,
          email: this.email,
          phone: this.phone,
          phone_type: this.phone_type,
          phone_country: this.country,
          role: this.role,
          password: this.password
        })
        .then(result => {
          this.clearFields();
          this.$emit("success");
        })
        .catch(err => {
          this.error = `Oh no! Something went wrong!\n${err}`;
        });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
