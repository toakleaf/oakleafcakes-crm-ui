<template>
  <section class="pad-route">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <div class="box">
          <h1 class="title">My Account Profile</h1>
          <div class="columns is-centered">
            <div class="column is-three-quarters">
              <div class="field">
                <table class="table is-bordered is-narrow">
                  <tbody>
                    <tr>
                      <td>Account ID</td>
                      <td>{{id}}</td>
                    </tr>
                    <tr>
                      <td>Active Since</td>
                      <td>{{created_at ? created_at.toLocaleDateString() : null}}</td>
                    </tr>
                    <tr>
                      <td>Last Updated</td>
                      <td>{{updated_at ? updated_at.toLocaleDateString() : null}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="field">
                <label class="label">First Name</label>
                <p class="control has-icons-left">
                  <input
                    v-model="first_name"
                    class="input"
                    :class="{'is-success': !$v.first_name.$invalid && first_name !== $store.getters.authorFirstName, 'is-danger': $v.first_name.$error}"
                    type="text"
                    placeholder="First Name"
                    @blur="$v.first_name.$touch();"
                    :disabled="!editing"
                  >
                  <span class="icon is-left">
                    <i class="fas fa-user-astronaut"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Last Name</label>
                <p class="control has-icons-left">
                  <input
                    v-model="last_name"
                    class="input"
                    :class="{'is-success': !$v.last_name.$invalid && last_name !== $store.getters.authorLastName, 'is-danger': $v.last_name.$error}"
                    type="text"
                    placeholder="Last Name"
                    @blur="$v.last_name.$touch();"
                    :disabled="!editing"
                  >
                  <span class="icon is-left">
                    <i class="fas fa-user-astronaut"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Company Name</label>
                <p class="control has-icons-left">
                  <input
                    v-model="company_name"
                    class="input"
                    type="text"
                    placeholder="Company Name"
                    :disabled="!editing"
                  >
                  <span class="icon is-left">
                    <i class="fas fa-crow"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <p class="control has-icons-left">
                  <input
                    v-model="email"
                    class="input"
                    :class="{'is-success': !$v.email.$invalid && email !== $store.getters.authorEmail, 'is-danger': $v.email.$error}"
                    type="text"
                    placeholder="@mail"
                    :disabled="!editing"
                    @blur="$v.email.$touch();"
                    @input="checkForDuplicateEmail"
                  >
                  <span class="icon is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Phone</label>
              </div>
              <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                  <input
                    class="input"
                    :class="{'is-success': !$v.phone.$invalid && phone !== $store.getters.authorPhone, 'is-danger': $v.phone.$error}"
                    type="text"
                    placeholder="Phone"
                    v-model="phone"
                    :disabled="!editing"
                    @blur="$v.phone.$touch()"
                  >
                  <span class="icon is-left">
                    <i class="fas fa-phone"></i>
                  </span>
                </p>
                <p class="control">
                  <span class="select">
                    <select v-model="phone_type" @change="$v.phone.$touch()" :disabled="!editing">
                      <option value="mobile">Mobile</option>
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                    </select>
                  </span>
                </p>
                <p class="control has-icons-left">
                  <span class="select">
                    <select
                      v-model="phone_country"
                      @change="$v.phone.$touch()"
                      :disabled="!editing"
                    >
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
              </div>
              <div class="field" v-if="editing">
                <label class="label">
                  Change Password
                  <small>(optional)</small>
                </label>
                <p class="control has-icons-left">
                  <input
                    v-model="password"
                    class="input"
                    :class="{'is-success': !$v.password.$invalid && password, 'is-danger': $v.password.$error}"
                    type="password"
                    placeholder="Password"
                    @blur="$v.password.$touch();"
                  >
                  <span class="icon is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div class="field" v-if="editing">
                <label class="label">Confirm Password Change</label>
                <p class="control has-icons-left">
                  <input
                    v-model="confirmPassword"
                    class="input"
                    :class="{'is-success': !$v.confirmPassword.$invalid && password, 'is-danger': $v.confirmPassword.$error}"
                    type="password"
                    placeholder="Confirm Password"
                    @blur="$v.confirmPassword.$touch();"
                  >
                  <span class="icon is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div class="field is-grouped">
                <div class="control" v-if="!editing">
                  <button @click="editing = true" class="button is-primary is-outlined">
                    <span class="icon">
                      <i class="fas fa-pencil-alt"></i>
                    </span>
                    <span>Edit Profile</span>
                  </button>
                </div>
                <div class="control" v-if="editing">
                  <button
                    @click="pushUpdates()"
                    class="button is-primary"
                    :disabled="this.$v.$invalid"
                    :class="{'is-loading': submitting}"
                  >
                    <span class="icon">
                      <i class="far fa-save"></i>
                    </span>
                    <span>Update Profile</span>
                  </button>
                </div>
                <div class="control">
                  <button
                    @click="editing = false; loadAuthorData()"
                    class="button is-outlined"
                    v-if="editing"
                  >
                    <span class="icon">
                      <i class="fas fa-ban"></i>
                    </span>
                    <span>cancel edits</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../axiosAPI";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
let PhoneNumber = require("awesome-phonenumber");

let listCountries = PhoneNumber.getSupportedCallingCodes();
let listRegions = listCountries.map(c =>
  PhoneNumber.getRegionCodeForCountryCode(c)
);
listRegions = listRegions.sort().filter(item => item !== "001"); //removes the 001's

export default {
  name: "profile",
  data: function() {
    return {
      id: null,
      first_name: null,
      last_name: null,
      company_name: null,
      email: null,
      phone_type: null,
      phoneInput: null,
      phone_country: null,
      created_at: null,
      updated_at: null,
      password: null,
      confirmPassword: null,
      editing: false,
      regions: listRegions,
      checkingEmail: false,
      emailCheckedForDuplicate: null,
      emailIsUnique: true,
      timeout: null,
      submitting: false
    };
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
    },
    password: {
      minLen: minLength(12)
    },
    confirmPassword: {
      sameAs: sameAs("password")
    }
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
    loadAuthorData: function() {
      this.id = this.$store.getters.authorID;
      this.first_name = this.$store.getters.authorFirstName;
      this.last_name = this.$store.getters.authorLastName;
      this.company_name = this.$store.getters.authorCompanyName;
      this.email = this.$store.getters.authorEmail;
      this.phone = this.$store.getters.authorPhone;
      this.phone_type = this.$store.getters.authorPhoneType;
      this.phone_country = this.$store.getters.authorPhoneCountry;
      this.created_at = this.$store.getters.authorCreatedAt;
      this.updated_at = this.$store.getters.authorUpdatedAt;
      this.password = null;
      this.confirmPassword = null;
      this.$v.$reset();
    },
    pushUpdates: function() {
      if (this.$v.$invalid) return;
      let proceed = confirm("Do you wish to permanently overwrite this data?");
      if (!proceed) return;
      this.submitting = true;
      axios
        .put(`/account/${this.id}`, {
          first_name: this.first_name,
          last_name: this.last_name,
          company_name: this.company_name,
          new_email: this.email,
          current_email: this.$store.getters.authorEmail,
          new_phone: this.phone,
          current_phone: this.$store.getters.authorPhone,
          phone_type: this.phone_type,
          phone_country: this.phone_country,
          ...(this.password ? { password: this.password } : {}),
          email_is_primary: true,
          phone_is_primary: true
        })
        .then(() => {
          this.$store.dispatch("fetchAuthorData");
          this.$v.$reset();
          this.editing = false;
          this.submitting = false;
          this.$toast.open({
            message: "Account Updated Successfully!",
            type: "is-success"
          });
        })
        .catch(err => console.error(err));
    }
  },
  created() {
    this.loadAuthorData();
  }
};
</script>

<style lang="scss" scoped>
</style>

