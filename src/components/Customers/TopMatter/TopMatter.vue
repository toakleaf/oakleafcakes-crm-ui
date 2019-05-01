<template>
  <div class="columns is-variable is-1">
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <b-autocomplete
            :data="searchResults.first_name"
            field="first_name"
            :loading="isFetching"
            placeholder="First Name"
            v-model="firstName"
            @input="fetchCustomers('first_name', firstName)"
            @select="options => setFields(options)"
          >
            <template slot-scope="props">
              <app-search-dropdown :props="props" field="first_name" :value="firstName"/>
              <!-- <p class="is-size-7 searchResults">
                <span>{{highlightText(props.option.first_name, firstName).before}}</span>
                <span
                  class="has-text-weight-bold"
                >{{highlightText(props.option.first_name, firstName).selected}}</span>
                <span>{{highlightText(props.option.first_name, firstName).after}} {{props.option.last_name + " "}}</span>
                <span class="searchCompany" v-if="props.option.company_name">
                  <i>{{props.option.company_name}}</i>
                </span>
                <span class="is-pulled-right">{{' ' + props.option.phone}}</span>
                <br>
                <span class="searchIndent">{{props.option.email}}</span>
              </p>-->
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
            :loading="isFetching"
            placeholder="Last Name"
            v-model="lastName"
            @input="fetchCustomers('last_name', lastName)"
            @select="options => setFields(options)"
          >
            <template slot-scope="props">
              <app-search-dropdown :props="props" field="last_name" :value="lastName"/>
              <!-- <p class="is-size-7 searchResults">
                <span>{{props.option.firstName}} {{highlightText(props.option.last_name, lastName).before}}</span>
                <span
                  class="has-text-weight-bold"
                >{{highlightText(props.option.last_name, lastName).selected}}</span>
                <span>{{highlightText(props.option.last_name, lastName).after + " "}}</span>
                <span class="searchCompany" v-if="props.option.company_name">
                  <i>{{props.option.company_name}}</i>
                </span>
                <span class="is-pulled-right">{{' ' + props.option.phone}}</span>
                <br>
                <span class="searchIndent">{{props.option.email}}</span>
              </p>-->
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
          <input class="input" type="text" placeholder="@mail">
          <span class="icon is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Phone">
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
      isFetching: false,
      orderBy: null,
      order: "asc",
      count: null,
      page: null,
      selected: null
    };
  },
  methods: {
    fetchCustomers: function(field, query) {
      if (!query || (this.selected && query === this.selected[field])) {
        // don't fetch if no query or if just a selection event
        this.clearSearchResults();
        return;
      }

      clearTimeout(this.timeout); //resets the clock since last time this function was called (to avoid multiple calls in short timespan)
      this.isFetching = true;

      this.timeout = setTimeout(() => {
        axios
          .get(
            `/account/search/?field=${field}&query=${query}&orderby=${
              this.orderBy
            }&order=${this.order}&count=${this.count}&page=${this.page}`
          )
          .then(result => {
            this.clearSearchResults();
            result.data.forEach(item => this.searchResults[field].push(item));
            this.isFetching = false;
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
