<template>
  <section class="container pad-route">
    <div class="box">
      <h1 class="title">My Account Profile</h1>
      <div class="columns is-multiline">
        <div class="column is-two-thirds">
          <app-account-card :account="$store.getters.author"/>
        </div>
        <div class="column">
          <app-preference-card :account="$store.getters.author"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../axiosAPI";
import AccountCard from "@/containers/AccountCard.vue";
import PreferenceCard from "@/containers/PreferenceCard.vue";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
let PhoneNumber = require("awesome-phonenumber");

let listCountries = PhoneNumber.getSupportedCallingCodes();
let listRegions = listCountries.map(c =>
  PhoneNumber.getRegionCodeForCountryCode(c)
);
listRegions = listRegions.sort().filter(item => item !== "001"); //removes the 001's

export default {
  components: {
    "app-account-card": AccountCard,
    "app-preference-card": PreferenceCard
  },
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
      required
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
    loadAuthorData: function() {
      this.author = this.$store.getters.author;
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
          emails: [
            {
              new_email: this.email,
              current_email: this.$store.getters.authorEmail,
              is_primary: true
            }
          ],
          phones: [
            {
              new_phone: this.phone,
              current_phone: this.$store.getters.authorPhone,
              phone_type: this.phone_type,
              phone_country: this.phone_country,
              is_primary: true
            }
          ],
          ...(this.password ? { password: this.password } : {})
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
  beforeCreate() {
    //make sure author data is fresh on each load
    this.$store.dispatch("fetchAuthorData");
  },
  created() {
    this.loadAuthorData();
  }
};
</script>

<style lang="scss" scoped>
</style>

