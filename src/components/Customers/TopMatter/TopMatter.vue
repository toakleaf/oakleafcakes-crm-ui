<template>
  <div class="columns is-variable is-1">
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <b-autocomplete
            :data="searchResults.first_name"
            field="first_name"
            :loading="isFetching.first_name"
            placeholder="First Name"
            v-model="firstName"
            @keyup.backspace.native="firstName ? null : clearFields()"
            @input="fetchCustomers('first_name', firstName)"
            @select="options => setFields(options)"
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
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <b-autocomplete
            :data="searchResults.last_name"
            field="last_name"
            :loading="isFetching.last_name"
            placeholder="Last Name"
            v-model="lastName"
            @keyup.backspace.native="lastName ? null : clearFields()"
            @input="fetchCustomers('last_name', lastName)"
            @select="options => setFields(options)"
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
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <b-autocomplete
            :data="searchResults.email"
            field="email"
            :loading="isFetching.email"
            placeholder="@mail"
            v-model="email"
            @keyup.backspace.native="email ? null : clearFields()"
            @input="fetchCustomers('email', email)"
            @select="options => setFields(options)"
          >
            <template slot-scope="props">
              <app-search-dropdown :props="props" field="email" :value="email"/>
            </template>
          </b-autocomplete>
          <span class="icon is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <b-autocomplete
            :data="searchResults.phone"
            field="phone"
            :loading="isFetching.phone"
            placeholder="Phone"
            v-model="phone"
            @keyup.backspace.native="phone ? null : clearFields()"
            @input="fetchCustomers('phone', phone)"
            @select="options => setFields(options)"
          >
            <template slot-scope="props">
              <app-search-dropdown :props="props" field="phone" :value="phone"/>
            </template>
          </b-autocomplete>
          <span class="icon is-left">
            <i class="fas fa-phone"></i>
          </span>
        </p>
      </div>
    </div>
    <div v-if="!userSelected" class="column is-narrow">
      <p class="button is-primary">
        <i class="fas fa-user-plus"></i>
      </p>
    </div>
    <div v-else class="column is-narrow">
      <p class="button is-primary is-outlined">
        <i class="fas fa-user-edit"></i>
      </p>
    </div>
    <!-- <br> -->
    <!-- <p>{{searchResults.first_name}}</p> -->
    <!-- <p>{{selected}}</p> -->
    <!-- <p>{{allowSearch}}</p> -->
    <!-- <p>{{firstName}}</p> -->
    <!-- <button @click="selected = null">null</button> -->
  </div>
</template>
<script>
import SearchDropdown from "@/components/Customers/TopMatter/SearchDropdown.vue";
import axios from "../../../axiosAPI";

export default {
  name: "TopMatter",
  components: {
    "app-search-dropdown": SearchDropdown
  },
  data: function() {
    return {
      searchResults: {
        first_name: [],
        last_name: [],
        email: [],
        phone: []
      },
      userSelected: false,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      timeout: null,
      isFetching: {
        first_name: false,
        last_name: false,
        email: false,
        phone: false
      },
      orderBy: null,
      order: "asc",
      count: null,
      page: null,
      selected: null
    };
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
    setFields: function(data) {
      if (!data) return;
      this.selected = data;
      this.firstName = data.first_name;
      this.lastName = data.last_name;
      this.email = data.email;
      this.phone = data.phone;
    },
    clearFields: function() {
      this.selected = null;
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.phone = null;
    },
    clearSearchResults: function(data) {
      this.searchResults = {
        first_name: [],
        last_name: [],
        email: [],
        phone: []
      };
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
