<template>
  <div class="columns is-variable is-1">
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <b-autocomplete
            :data="searchResults"
            field="first_name"
            :loading="isFetching"
            placeholder="First Name"
            open-on-focus
            v-model="firstName"
            @input="fetchCustomers('first_name', firstName)"
            @select="option => { selected = option}"
          >
            <template slot-scope="props">
              <p class="is-size-7 searchResults">
                {{props.option.first_name}} {{props.option.last_name}}
                <span
                  class="searchCompany"
                  v-if="props.option.company_name"
                >
                  <i>{{props.option.company_name}}</i>
                </span>
                <span class="is-pulled-right">{{' ' + props.option.phone}}</span>
                <br>
                <span class="searchIndent">{{props.option.email}}</span>
              </p>
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
          <input class="input" type="text" placeholder="Last Name">
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
    <!-- <p>{{searchResults}}</p> -->
    <!-- <p>{{selected}}</p> -->
    <p>{{firstName}}</p>
  </div>
</template>
<script>
import axios from "../../axiosAPI";

export default {
  name: "PrimaryInfo",
  data: function() {
    return {
      searchResults: [],
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
      if (!query || this.selected) {
        // don't fetch if no query or if just a selection event
        this.searchResults = [];
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
            this.searchResults = [];
            result.data.forEach(item => this.searchResults.push(item));
            this.isFetching = false;
          })
          .catch(err => {
            console.error("error: " + err);
          });
      }, 700);
    }
  }
};
</script>


<style lang="scss" scoped>
.searchResults {
  line-height: 115%;
  margin: -4px -40px -4px -8px;
}
.searchIndent {
  margin: 0 0 0 1.25em;
}
.searchCompany {
  font-size: 90%;
  color: black;
}
</style>
