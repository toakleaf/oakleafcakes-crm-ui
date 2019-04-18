<template>
  <div class="box">
    <div class="block">
      <b-radio v-model="role" native-value="ADMIN">Admin</b-radio>
      <b-radio v-model="role" native-value="EMPLOYEE">Employee</b-radio>
    </div>
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
        <input
          class="input"
          :class="{'is-success': isValid.last_name}"
          type="text"
          placeholder="Last Name"
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
    <div class="field has-addons">
      <p class="control has-icons-left is-expanded">
        <input
          class="input"
          :class="{'is-success': isValid.phone, 'is-warning': hasError.phone}"
          type="text"
          placeholder="Phone"
          v-model="phone"
          @blur="checkPhone"
        >
        <span class="icon is-left">
          <i class="fas fa-phone"></i>
        </span>
      </p>
      <p class="control">
        <a class="button is-static">Country</a>
      </p>
      <p class="control has-icons-left">
        <span class="select">
          <select v-model="country" @change="checkPhone">
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
        <input class="input" type="password" placeholder="Password">
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
        <input class="input" type="password" placeholder="Password Confirm">
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
</template>

<script>
import axios from "../../axiosAPI";
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
      passwordConfirm: null,
      pants: "hi",
      regions: listRegions,
      country: "US",
      phoneInput: null,
      hasError: {
        phone: false
      },
      isValid: {
        last_name: false,
        phone: false
      }
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
          this.isValid.phone = true;
          this.checkPhone();
          return ayt.getPhoneNumber().a.number.national;
        }
        if (this.isValid.phone) this.hasError.phone = true;
        this.isValid.phone = false;
        return this.phoneInput;
      }
    }
  },
  methods: {
    checkPhone: function() {
      this.hasError.phone = this.phoneInput && !this.isValid.phone;
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
