<template>
  <div class="columns">
    <div class="column is-half">
      <div class="box modal-card">
        <p class="subtitle">Add New Account</p>
        <div class="field">
          <b-radio
            v-model="role"
            native-value="ADMIN"
            v-if="$store.getters.authorRole === 'ADMIN'"
          >Admin</b-radio>
          <b-radio
            v-model="role"
            native-value="EMPLOYEE"
            v-if="$store.getters.authorRole === 'ADMIN' || $store.getters.authorRole === 'EMPLOYEE'"
          >Employee</b-radio>
          <b-radio v-model="role" native-value="CUSTOMER">Customer</b-radio>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="First Name"
              v-model="first_name"
              @blur="$v.first_name.$touch()"
            >
            <span class="icon is-left">
              <i class="fas fa-user-astronaut"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Last Name" v-model="last_name">
            <span class="icon is-left">
              <i class="fas fa-user-astronaut"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Company Name"
              v-model="company_name"
              @blur="$v.company_name.$touch()"
            >
            <span class="icon is-left">
              <i class="fas fa-store"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <app-email-check @update:email="updateEmail"/>
        </div>
        <div class="field">
          <app-phone-check @update:phone="updatePhone"/>
        </div>
        <div class="field" v-if="hasPassword">
          <app-password-check @update:password="updatePassword"/>
        </div>
        <div class="field is-grouped">
          <p class="control">
            <a class="button is-primary" @click="submitForm" :disabled="disableSubmit">
              <span class="icon">
                <i class="far fa-plus-square"></i>
              </span>
              <span>New Account</span>
            </a>
          </p>
          <p class="control">
            <a class="button" @click="$parent.close()">
              <span class="icon">
                <i class="fas fa-ban"></i>
              </span>
              <span>Cancel</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axiosAPI";
import EmailCheck from "@/components/Form/EmailCheck.vue";
import PhoneCheck from "@/components/Form/PhoneCheck.vue";
import PasswordCheck from "@/components/Form/PasswordCheck.vue";
import { required, requiredUnless, requiredIf } from "vuelidate/lib/validators";

export default {
  components: {
    "app-email-check": EmailCheck,
    "app-phone-check": PhoneCheck,
    "app-password-check": PasswordCheck
  },
  props: {
    hasPassword: {
      default: true,
      type: Boolean
    },
    hasIconLeft: {
      default: true,
      type: Boolean
    },
    iconLeft: {
      default: "fas fa-envelope",
      type: String
    },
    size: {
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    readonly: {
      default: false,
      type: Boolean
    }
  },
  name: "AddAccount",
  data: function() {
    return {
      role: "CUSTOMER",
      first_name: null,
      last_name: null,
      company_name: null,
      email: null,
      emailValid: false,
      emailError: true,
      phone: null,
      phone_type: null,
      phone_country: "US",
      phoneValid: false,
      phoneError: true,
      password: null,
      passwordValid: false,
      passwordError: true
    };
  },
  computed: {
    disableSubmit: function() {
      if (
        this.$v.$invalid ||
        (this.email && !this.emailValid) ||
        (this.phone && !this.phoneValid) ||
        (this.password && this.passwordError)
      )
        return true;
      return false;
    }
  },
  validations: {
    first_name: {
      required: requiredUnless("company_name")
    },
    company_name: {
      required: requiredUnless("first_name")
    },
    email: {
      required: requiredUnless("phone"),
      required2: requiredIf("password")
    },
    phone: {
      required: requiredUnless("email")
    },
    password: {}
  },
  methods: {
    updateEmail: function(val) {
      if (!val) return;
      this.email = val.email;
      this.emailValid = val.valid;
      this.emailError = val.error;
      this.$v.email.$touch();
    },
    updatePhone: function(val) {
      if (!val) return;
      this.phone = val.phone;
      this.phone_type = val.phone_type;
      this.phone_country = val.phone_country;
      this.phoneValid = val.valid;
      this.phoneError = val.error;
      this.$v.phone.$touch();
    },
    updatePassword: function(val) {
      if (!val) return;
      this.password = val.password;
      this.passwordValid = val.valid;
      this.passwordError = val.error;
      this.$v.password.$touch();
    },
    submitForm: function() {
      this.$store.dispatch("setStatus", "pending");
      if (this.disableSubmit) return;
      axios
        .post(`/account/register/`, {
          ...(this.first_name ? { first_name: this.first_name } : {}),
          ...(this.last_name ? { last_name: this.last_name } : {}),
          ...(this.company_name ? { company_name: this.company_name } : {}),
          ...(this.email ? { email: this.email } : {}),
          ...(this.phone ? { phone: this.phone } : {}),
          ...(this.phone_type ? { phone_type: this.phone_type } : {}),
          ...(this.phone_country ? { phone_country: this.phone_country } : {}),
          ...(this.role ? { role: this.role } : {}),
          ...(this.password ? { password: this.password } : {})
        })
        .then(result => {
          this.$store.dispatch(
            "sendSuccessMessage",
            "New account created successfully!"
          );
          this.$emit("success-response");
          this.$parent.close();
        })
        .catch(err => {
          console.error(err);
          this.$store.dispatch(
            "sendErrorMessage",
            "Error: Failed to create new account."
          );
        });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
