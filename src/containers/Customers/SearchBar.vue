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
                @keyup.backspace.native="companyName || !currentCustomer ? null : clearFields()"
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
                @keyup.backspace.native="firstName || !currentCustomer ? null : clearFields()"
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
                @keyup.backspace.native="lastName || !currentCustomer ? null : clearFields()"
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
                  @keyup.backspace.native="email || !currentCustomer ? null : clearFields()"
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
                  @keyup.backspace.native="phone || !currentCustomer ? null : clearFields()"
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
              v-if="(!currentCustomer || !disabled) && !$v.$invalid"
              class="control button is-primary"
              :disabled="$v.$invalid || currentCustomer || disabled"
              @click="createCustomer()"
            >
              <i class="fas fa-user-plus"></i>
            </button>
            <button
              v-if="currentCustomer || disabled || $v.$invalid"
              class="control button is-primary is-outlined"
              @click="clearFields()"
            >
              <i class="fas fa-snowplow"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-narrow is-hidden-desktop">
      <div class="field is-grouped">
        <button
          v-if="(!currentCustomer || !disabled) && !$v.$invalid"
          class="control button is-primary"
          :disabled="$v.$invalid || currentCustomer || disabled"
          @click="createCustomer()"
        >
          <i class="fas fa-user-plus"></i>
        </button>
        <button
          v-if="currentCustomer || disabled || $v.$invalid"
          class="control button is-primary is-outlined"
          @click="clearFields()"
        >
          <i class="fas fa-snowplow"></i>
        </button>
        <button class="control button is-outlined is-hidden-tablet" @click="isCompany = !isCompany">
          <i class="fas fa-store"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import SearchDropdown from "@/components/Customers/SearchBar/SearchDropdown.vue";
import PhoneCountryDrop from "@/components/Customers/SearchBar/PhoneCountryDrop.vue";
import { required, requiredUnless, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import axios from "../../axiosAPI";
let PhoneNumber = require("awesome-phonenumber");
let listCountries = PhoneNumber.getSupportedCallingCodes();
let listRegions = listCountries.map(c =>
  PhoneNumber.getRegionCodeForCountryCode(c)
);
listRegions = listRegions.sort().filter(item => item !== "001"); //removes the 001's

export default {
  name: "SearchBar",
  components: {
    "app-search-dropdown": SearchDropdown,
    "app-phone-country-drop": PhoneCountryDrop
  },
  props: ["customer"],
  data: function() {
    return {
      disabledVal: false,
      searchResults: {
        first_name: [],
        last_name: [],
        company_name: [],
        email: [],
        phone: []
      },
      inputs: {
        currentCustomer: null,
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
      phone_country: "US",
      previous_queries: {
        first_name: [],
        last_name: [],
        company_name: [],
        email: [],
        phone: []
      }
    };
  },
  computed: {
    ...mapGetters([
      "currentCustomer",
      "currentCustomerCreatedAt",
      "currentCustomerUpdatedAt"
    ]),
    disabled: {
      set: function(val) {
        this.disabledVal = val;
      },
      get: function() {
        return this.currentCustomer ? true : this.disabledVal;
      }
    },
    firstName: {
      set: function(val) {
        this.inputs.firstName = val;
      },
      get: function() {
        if (this.currentCustomer) return this.currentCustomer.first_name;
        return this.inputs.firstName;
      }
    },
    lastName: {
      set: function(val) {
        this.inputs.lastName = val;
      },
      get: function() {
        if (this.currentCustomer) return this.currentCustomer.last_name;
        return this.inputs.lastName;
      }
    },
    companyName: {
      set: function(val) {
        this.inputs.companyName = val;
      },
      get: function() {
        if (this.currentCustomer) return this.currentCustomer.company_name;
        return this.inputs.companyName;
      }
    },
    email: {
      set: function(val) {
        this.inputs.email = val;
      },
      get: function() {
        if (this.currentCustomer && this.currentCustomer.email)
          return this.currentCustomer.email;
        if (this.currentCustomer && this.currentCustomer.emails)
          return this.currentCustomer.emails.filter(e => e.is_primary)[0].email;
        return this.inputs.email;
      }
    },
    phone: {
      set: function(val) {
        this.inputs.phone = val;
      },
      get: function() {
        if (this.currentCustomer && this.currentCustomer.phone)
          return this.currentCustomer.phone;
        if (this.currentCustomer && this.currentCustomer.phones)
          return this.currentCustomer.phones.filter(p => p.is_primary)[0].phone;

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
        // this is a 'ilike' search, so if val is contained in an existing email it will block,
        // however, for efficiency, and extreme unlikelyhood of problem, I think it's going to be fine for this page.
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
    ...mapActions([
      "fetchCurrentCustomer",
      "setCurrentCustomer",
      "clearCurrentCustomer"
    ]),
    fetchCustomers: function(field, query) {
      this.previous_queries[field].push(query);
      if (
        !query ||
        query.length < 2 ||
        (this.previous_queries[field].pop().length > 4 && //prevent oversearching by stopping search if big query but no results
          this.searchResults[field].length < 1) ||
        (this.currentCustomer && query === this.currentCustomer[field]) ||
        (this.currentCustomer &&
          this.currentCustomer.emails &&
          this.currentCustomer.emails.some(e => query === e.email)) ||
        (this.currentCustomer &&
          this.currentCustomer.emails &&
          this.currentCustomer.phones.some(p => query === p.phone))
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
      if (this.currentCustomer) return;

      axios
        .post("/account/register", {
          role: "CUSTOMER",
          ...(this.firstName ? { first_name: this.firstName } : {}),
          ...(this.lastName ? { last_name: this.lastName } : {}),
          ...(this.companyName ? { company_name: this.companyName } : {}),
          ...(this.companyName ? { company_name: this.companyName } : {}),
          ...(this.email ? { email: this.email } : {}),
          ...(this.phone
            ? { phone: this.phone, phone_country: this.phoneCountry }
            : {})
        })
        .then(res => {
          console.log(res.data);
          this.setFields(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    setFields: function(data) {
      if (!data) return;
      this.firstName = data.first_name;
      this.lastName = data.last_name;
      this.companyName = data.company_name;
      if (data.hasOwnProperty("email")) {
        this.email = data.email;
      } else {
        this.email =
          data.emails && data.emails.some(e => e.is_primary)
            ? data.emails.filter(e => e.is_primary)[0].email
            : null;
      }
      if (data.hasOwnProperty("phone")) {
        this.phone = data.phone;
      } else {
        this.phone =
          data.phones && data.phones.some(p => p.is_primary)
            ? data.phones.filter(p => p.is_primary)[0].phone
            : null;
      }
      this.disabled = true;
      this.$v.$reset();
      this.setCurrentCustomer(data);
    },
    clearFields: function() {
      this.clearCurrentCustomer();
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
      if (this.currentCustomer) return "";
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
