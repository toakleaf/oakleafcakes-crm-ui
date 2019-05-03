<template>
  <div class="columns is-variable is-1 is-multiline">
    <div class="column is-full-tablet is-5-desktop">
      <div class="columns is-variable is-1">
        <div class="column" v-if="isCompany">
          <div class="field">
            <p class="control has-icons-left">
              <b-autocomplete
                :data="searchResults.company_name"
                field="company_name"
                :loading="isFetching.company_name"
                placeholder="Company Name"
                v-model="companyName"
                @dblclick.native="isCompany = false"
                @keyup.backspace.native="companyName || !selected ? null : clearFields()"
                @input="fetchCustomers('company_name', companyName)"
                @select="options => setFields(options)"
                @blur="$v.email.$touch();"
                :disabled="disabled"
              >
                <template slot-scope="props">
                  <app-search-dropdown :props="props" field="first_name" :value="companyName"/>
                </template>
              </b-autocomplete>
              <span class="icon is-left">
                <i class="fas fa-store"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="column" v-if="!isCompany">
          <div class="field">
            <p class="control has-icons-left">
              <b-autocomplete
                :data="searchResults.first_name"
                field="first_name"
                :loading="isFetching.first_name"
                placeholder="First Name"
                v-model="firstName"
                @dblclick.native="isCompany = true"
                @keyup.backspace.native="firstName || !selected ? null : clearFields()"
                @input="fetchCustomers('first_name', firstName)"
                @select="options => setFields(options)"
                @blur="$v.firstName.$touch();"
                :disabled="disabled"
              >
                <template slot-scope="props">
                  <app-search-dropdown :props="props" field="first_name" :value="firstName"/>
                </template>
              </b-autocomplete>
              <span class="icon is-left">
                <i class="fas fa-user-astronaut"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="column" v-if="!isCompany">
          <div class="field">
            <p class="control has-icons-left">
              <b-autocomplete
                :data="searchResults.last_name"
                field="last_name"
                :loading="isFetching.last_name"
                placeholder="Last Name"
                v-model="lastName"
                @dblclick.native="isCompany = true"
                @keyup.backspace.native="lastName || !selected ? null : clearFields()"
                @input="fetchCustomers('last_name', lastName)"
                @select="options => setFields(options)"
                @blur="$v.lastName.$touch();"
                :disabled="disabled"
              >
                <template slot-scope="props">
                  <app-search-dropdown :props="props" field="last_name" :value="lastName"/>
                </template>
              </b-autocomplete>
              <span class="icon is-left">
                <i class="fas fa-user-astronaut"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-full-tablet is-7-desktop">
      <div class="columns is-variable is-1">
        <div class="column">
          <div class="field">
            <p class="control has-icons-left">
              <b-field :type="getClass($v.email, email)" addons>
                <b-autocomplete
                  :data="searchResults.email"
                  field="email"
                  :loading="isFetching.email"
                  placeholder="@mail"
                  v-model="email"
                  @keyup.backspace.native="email || !selected ? null : clearFields()"
                  @input="fetchCustomers('email', email)"
                  @select="options => setFields(options)"
                  @blur="$v.email.$touch();"
                  :disabled="disabled"
                >
                  <template slot-scope="props">
                    <app-search-dropdown :props="props" field="email" :value="email"/>
                  </template>
                </b-autocomplete>
              </b-field>
              <span class="icon is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="field has-addons">
            <div class="control has-icons-left is-expanded">
              <b-field :type="getClass($v.phone, phone)" addons>
                <b-autocomplete
                  :data="searchResults.phone"
                  field="phone"
                  :loading="isFetching.phone"
                  placeholder="Phone"
                  v-model="phone"
                  @keyup.backspace.native="phone || !selected ? null : clearFields()"
                  @input="fetchCustomers('phone', phone)"
                  @select="options => setFields(options)"
                  @blur="$v.phone.$touch();"
                  :disabled="disabled"
                >
                  <template slot-scope="props">
                    <app-search-dropdown :props="props" field="phone" :value="phone"/>
                  </template>
                </b-autocomplete>
              </b-field>
              <span class="icon is-left">
                <i class="fas fa-phone"></i>
              </span>
            </div>
            <div class="control countries">
              <b-autocomplete
                v-model="phone_country"
                :data="phone_country === 'US' ? regions : filteredRegions"
                open-on-focus
                @select="option => phone_country = option"
                @blur="$v.phone.$touch();"
                :disabled="disabled"
              >
                <template slot-scope="props">
                  <app-phone-country-drop :props="props"/>
                </template>
              </b-autocomplete>
            </div>
          </div>
        </div>
        <div class="column is-narrow is-hidden-touch">
          <div class="field is-grouped">
            <button
              v-if="!selected || !disabled"
              class="control button is-primary"
              :disabled="$v.$invalid || selected || disabled"
              @click="createCustomer()"
            >
              <i class="fas fa-user-plus"></i>
            </button>
            <button
              v-if="selected || disabled"
              class="control button is-primary is-outlined"
              @click="clearFields()"
            >
              <i class="fas fa-user-slash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-narrow is-hidden-desktop">
      <div class="field is-grouped">
        <button
          v-if="!selected || !disabled"
          class="control button is-primary"
          :disabled="$v.$invalid || selected || disabled"
          @click="createCustomer()"
        >
          <i class="fas fa-user-plus"></i>
        </button>
        <button
          v-if="selected || disabled"
          class="control button is-primary is-outlined"
          @click="clearFields()"
        >
          <i class="fas fa-user-slash"></i>
        </button>
        <button class="control button is-outlined is-hidden-tablet" @click="isCompany = !isCompany">
          <i class="fas fa-store"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import SearchDropdown from "@/components/Customers/TopMatter/SearchDropdown.vue";
import PhoneCountryDrop from "@/components/Customers/TopMatter/PhoneCountryDrop.vue";
import { required, requiredUnless, email } from "vuelidate/lib/validators";
import axios from "../../../axiosAPI";
let PhoneNumber = require("awesome-phonenumber");
let listCountries = PhoneNumber.getSupportedCallingCodes();
let listRegions = listCountries.map(c =>
  PhoneNumber.getRegionCodeForCountryCode(c)
);
listRegions = listRegions.sort().filter(item => item !== "001"); //removes the 001's

export default {
  name: "TopMatter",
  components: {
    "app-search-dropdown": SearchDropdown,
    "app-phone-country-drop": PhoneCountryDrop
  },
  props: ["customer"],
  data: function() {
    return {
      disabled: false,
      searchResults: {
        first_name: [],
        last_name: [],
        company_name: [],
        email: [],
        phone: []
      },
      inputs: {
        selected: null,
        firstName: null,
        lastName: null,
        companyName: null,
        email: null,
        phone: null
      },
      isCompany: false,
      timeout: null,
      isFetching: {
        first_name: false,
        last_name: false,
        company_name: false,
        email: false,
        phone: false
      },
      orderBy: null,
      order: "asc",
      count: null,
      page: null,
      regions: listRegions,
      phone_country: "US"
    };
  },
  computed: {
    selected: {
      set: function(val) {
        this.inputs.selected = val;
      },
      get: function() {
        if (this.inputs.selected) return this.inputs.selected;
        if (this.customer) {
          this.disabled = true;
          return this.customer;
        }
        return null;
      }
    },
    firstName: {
      set: function(val) {
        this.inputs.firstName = val;
      },
      get: function() {
        if (this.inputs.firstName) return this.inputs.firstName;
        return this.customer ? this.customer.first_name : null;
      }
    },
    lastName: {
      set: function(val) {
        this.inputs.lastName = val;
      },
      get: function() {
        if (this.inputs.lastName) return this.inputs.lastName;
        return this.customer ? this.customer.last_name : null;
      }
    },
    companyName: {
      set: function(val) {
        this.inputs.companyName = val;
      },
      get: function() {
        if (this.inputs.companyName) return this.inputs.companyName;
        return this.customer ? this.customer.company_name : null;
      }
    },
    email: {
      set: function(val) {
        this.inputs.email = val;
      },
      get: function() {
        if (this.inputs.email) return this.inputs.email;
        return this.customer ? this.customer.email : null;
      }
    },
    phone: {
      set: function(val) {
        this.inputs.phone = val;
      },
      get: function() {
        if (!this.inputs.phone)
          this.inputs.phone = this.customer ? this.customer.phone : null;
        let ayt = PhoneNumber.getAsYouType(this.phone_country);
        ayt.reset(this.inputs.phone);
        if (ayt.getPhoneNumber().a.valid) {
          return ayt.getPhoneNumber().a.number.national;
        }
        return this.inputs.phone;
      }
    },
    filteredRegions() {
      return listRegions.filter(option => {
        if (!option || !this.phone_country) return;
        return (
          option
            .toString()
            .toUpperCase()
            .indexOf(this.phone_country.toUpperCase()) >= 0
        );
      });
    }
  },
  validations: {
    firstName: {
      required: requiredUnless("companyName")
    },
    lastName: {
      required: requiredUnless("companyName")
    },
    companyName: {
      required: requiredUnless("lastName")
    },
    email: {
      required,
      email,
      unique: function(val) {
        if (!val) return true;
        return this.searchResults.email.length < 1;
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
    fetchCustomers: function(field, query) {
      if (
        !query ||
        (this.selected && query === this.selected[field]) ||
        query.length < 2
      ) {
        // don't fetch if no query or if just a selection event
        this.clearSearchResults();
        return;
      }

      clearTimeout(this.timeout); //resets the clock since last time this function was called (to avoid multiple calls in short timespan)
      this.isFetching[field] = true;

      this.timeout = setTimeout(() => {
        axios
          .get(
            `/account/search/?field=${field}&query=${query}${
              field === "first_name" || field === "last_name"
                ? `&field2=company_name&query2=` + query
                : ""
            }&orderby=${this.orderBy}&order=${this.order}&count=${
              this.count
            }&page=${this.page}`
          )
          .then(result => {
            this.clearSearchResults();
            result.data.forEach(item => this.searchResults[field].push(item));
            this.isFetching[field] = false;
          })
          .catch(err => {
            console.error("error: " + err);
          });
      }, 700);
    },
    createCustomer: function() {
      if (this.selected) return;

      axios
        .post("/account/register", {
          role: "CUSTOMER",
          email: this.email,
          ...(this.firstName ? { first_name: this.firstName } : {}),
          ...(this.lastName ? { last_name: this.lastName } : {}),
          ...(this.companyName ? { company_name: this.companyName } : {}),
          ...(this.companyName ? { company_name: this.companyName } : {}),
          ...(this.phone ? { phone: this.phone } : {}),
          ...(this.phone ? { phone_country: this.phoneCountry } : {})
        })
        .then(res => {
          this.setFields(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    setFields: function(data) {
      if (!data) return;
      this.selected = data;
      this.firstName = data.first_name;
      this.lastName = data.last_name;
      this.companyName = data.company_name;
      this.email = data.email;
      this.phone = data.phone;
      this.disabled = true;
      this.$v.$reset();
      this.$emit("set-customer", data);
    },
    clearFields: function() {
      this.$emit("set-customer", null);
      this.selected = null;
      this.firstName = null;
      this.lastName = null;
      this.companyName = null;
      this.email = null;
      this.phone = null;
      this.disabled = false;
      this.$v.$reset();
    },
    clearSearchResults: function(data) {
      this.searchResults = {
        first_name: [],
        last_name: [],
        company_name: [],
        email: [],
        phone: []
      };
    },
    getClass: function(val, input) {
      if (this.selected) return "";
      if (input && !val.$invalid) return "is-success";
      if (val.$error) return "is-danger";
      return "";
    }
  }
};
</script>


<style lang="scss" scoped>
.countries {
  max-width: 3.25em;
}
</style>
