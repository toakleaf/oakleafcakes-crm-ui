<template>
  <div class="field has-addons" :class="{'is-expanded': expanded}">
    <p
      class="control"
      :class="{'has-icons-left': hasIcon, 'has-icons-right': hasCheckmark, 'is-expanded': expanded}"
    >
      <input
        class="input"
        :class="{'is-success': !$v.phone.$invalid && phoneInput !== phoneNumber, 'is-danger': $v.phone.$error, 'is-small': size === 'is-small', 'is-medium': size === 'is-medium', 'is-large': size === 'is-large', 'is-expanded': expanded}"
        type="text"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        v-model="phone"
        @input="emitInput()"
        @blur="$v.phone.$touch()"
      >
      <span class="icon is-left" v-if="hasIcon">
        <i class="fas fa-phone"></i>
      </span>
      <span v-if="hasCheckmark && !isLoading" class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </p>
    <p class="control">
      <span
        class="select"
        :class="{'is-success': !$v.phone.$invalid && phoneInput !== phoneNumber, 'is-danger': $v.phone.$error, 'is-small': size === 'is-small', 'is-medium': size === 'is-medium', 'is-large': size === 'is-large'}"
      >
        <select
          v-model="phone_type"
          @change="$v.phone.$touch(); emitInput()"
          :readonly="readonly"
          :disabled="disabled"
        >
          <option value></option>
          <option value="mobile">Mobile</option>
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="emergency">Emerg</option>
        </select>
      </span>
    </p>
    <p class="control" :class="{'has-icons-left': hasGlobe}">
      <span
        class="select"
        :class="{'is-success': !$v.phone.$invalid && phoneInput !== phoneNumber, 'is-danger': $v.phone.$error, 'is-small': size === 'is-small', 'is-medium': size === 'is-medium', 'is-large': size === 'is-large'}"
      >
        <select
          v-model="phone_country"
          @change="$v.phone.$touch(); emitInput()"
          :readonly="readonly"
          :disabled="disabled"
        >
          <option v-for="region in regions" v-bind:value="region" :key="region">{{ region }}</option>
        </select>
      </span>
      <span class="icon is-small is-left" v-if="hasGlobe">
        <i class="fas fa-globe"></i>
      </span>
    </p>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
let PhoneNumber = require("awesome-phonenumber");
let listCountries = PhoneNumber.getSupportedCallingCodes();
let listRegions = listCountries.map(c =>
  PhoneNumber.getRegionCodeForCountryCode(c)
);
listRegions = listRegions.sort().filter(item => item !== "001"); //removes the 001's

export default {
  name: "PhoneCheck",
  props: {
    phoneNumber: {
      type: String
    },
    phoneNumberType: {
      type: String
    },
    phoneNumberCountry: {
      default: "US",
      type: String
    },
    hasCheckmark: {
      default: false,
      type: Boolean
    },
    hasIcon: {
      default: true,
      type: Boolean
    },
    hasGlobe: {
      default: true,
      type: Boolean
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
    },
    expanded: {
      default: true,
      type: Boolean
    },
    placeholder: {
      default: "Phone",
      type: String
    }
  },
  data: function() {
    return {
      regions: listRegions,
      phone_country: null,
      phone_type: null,
      phoneInput: null,
      error: false
    };
  },
  computed: {
    phone: {
      set: function(val) {
        this.phoneInput = val;
      },
      get: function() {
        let ayt = PhoneNumber.getAsYouType(this.phone_country);
        ayt.reset(this.phoneInput);
        if (ayt.getPhoneNumber().a.valid) {
          return ayt.getPhoneNumber().a.number.national;
        }
        return this.phoneInput;
      }
    }
  },
  validations: {
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
    emitInput: function() {
      if (this.phoneNumber) this.$v.phone.$touch();
      this.$emit("update:phone", {
        phone: this.phone,
        phone_country: this.phone_country,
        phone_type: this.phone_type,
        error: this.$v.phone.$error,
        valid: this.$v.phone.phone
      });
    }
  },
  created() {
    this.phone = this.phoneNumber;
    this.phone_type = this.phoneNumberType;
    this.phone_country = this.phoneNumberCountry;
  }
};
</script>


<style lang="scss" scoped>
</style>
