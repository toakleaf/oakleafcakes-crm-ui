<template>
  <p
    class="control"
    :class="{'is-loading': isLoading, 'has-icons-left': hasIconLeft, 'has-icons-right': hasCheckmark, 'is-small': size === 'is-small', 'is-medium': size === 'is-medium', 'is-large': size === 'is-large', 'is-expanded': expanded}"
  >
    <input
      class="input"
      :class="{'is-success': !$v.email.$invalid && emailAddress !== email, 'is-danger': $v.email.$error, 'is-small': size === 'is-small', 'is-medium': size === 'is-medium', 'is-large': size === 'is-large' }"
      type="text"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      v-model="email"
      @blur="$v.email.$touch();"
      @input="checkForDuplicateEmail"
    >
    <span class="icon is-left" v-if="hasIconLeft">
      <i :class="iconLeft"></i>
    </span>
    <span v-if="hasCheckmark && !isLoading" class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </p>
</template>

<script>
import axios from "@/axiosAPI";
import { email } from "vuelidate/lib/validators";

export default {
  name: "EmailCheck",
  props: {
    emailAddress: {
      type: String
    },
    hasCheckmark: {
      default: false,
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
    },
    expanded: {
      default: true,
      type: Boolean
    },
    placeholder: {
      default: "@mail",
      type: String
    }
  },
  data: function() {
    return {
      email: null,
      checkedEmails: {},
      isLoading: false,
      isUnique: true,
      timeout: null,
      error: null
    };
  },
  computed: {},
  validations: {
    email: {
      email,
      unique: function(val) {
        if (!val) return true;
        return this.isUnique;
      }
    }
  },
  methods: {
    checkForDuplicateEmail: function() {
      //only check valid emails
      if (!this.$v.email.email) return this.emitInput();
      //and don't recheck same email
      if (
        this.checkedEmails[this.email] ||
        this.checkedEmails[this.email] === false
      ) {
        this.isUnique = this.checkedEmails[this.email];
        return this.emitInput();
      }
      //resets the clock since last time this function was called (to avoid multiple calls in short timespan)
      clearTimeout(this.timeout);
      this.isLoading = true;
      this.emitInput(true);
      this.timeout = setTimeout(() => {
        axios
          .get(`/account/search/?exact=true&field=email&query=${this.email}`)
          .then(result => {
            if (result.data.length < 1) {
              this.checkedEmails[this.email] = true;
              this.isUnique = true;
            } else {
              this.checkedEmails[this.email] = false;
              this.isUnique = false;
            }
            this.isLoading = false;
            this.$v.email.$touch(); //because async
          })
          .then(() => {
            return this.emitInput();
          })
          .catch(err => {
            console.error("error: " + err);
          });
      }, 1000);
    },
    emitInput: function(pending = false) {
      this.$emit("update:email", {
        email: this.email,
        error: this.$v.email.$error || pending,
        valid: this.$v.email.email
      });
    }
  },
  created() {
    this.email = this.emailAddress;
    this.checkedEmails[this.emailAddress] = true;
  }
};
</script>


<style lang="scss" scoped>
</style>
