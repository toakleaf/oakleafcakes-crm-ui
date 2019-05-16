<template>
  <div>
    <div class="field">
      <p
        class="control"
        :class="[size, {'has-icons-left': hasIconLeft, 'has-icons-right': hasCheckmark, 'is-expanded': expanded}]"
      >
        <input
          class="input"
          :class="[size, {'is-success': $v.password.$dirty &&!$v.password.$invalid, 'is-danger': $v.password.$error}]"
          :type="showText ? 'text' : 'password'"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholderPassword"
          v-model="password"
          @blur="$v.password.$touch();"
          @input="emitInput"
        >
        <span class="icon is-left" v-if="hasIconLeft">
          <i :class="iconLeft"></i>
        </span>
        <span v-if="hasCheckmark && !isLoading" class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p
        class="control"
        :class="[size, {'has-icons-left': hasIconLeft, 'has-icons-right': hasCheckmark, 'is-expanded': expanded}]"
      >
        <input
          class="input"
          :class="[size, {'is-success': $v.confirmPassword.$dirty &&!$v.confirmPassword.$invalid, 'is-danger': $v.confirmPassword.$error}]"
          :type="showText ? 'text' : 'password'"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholderConfirm"
          v-model="confirmPassword"
          @blur="$v.confirmPassword.$touch();"
          @input="emitInput"
        >
        <span class="icon is-left" v-if="hasIconLeft">
          <i :class="iconLeft"></i>
        </span>
        <span v-if="hasCheckmark && !isLoading" class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "PasswordCheck",
  props: {
    length: {
      default: 12,
      type: Number
    },
    showText: {
      default: false,
      type: Boolean
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
      default: "fas fa-lock",
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
    placeholderPassword: {
      default: "password",
      type: String
    },
    placeholderConfirm: {
      default: "confirm",
      type: String
    }
  },
  data: function() {
    return {
      password: null,
      confirmPassword: null,
      error: null
    };
  },
  computed: {},
  validations: {
    password: {
      minLength(val) {
        return minLength(this.length)(val);
      }
    },
    confirmPassword: {
      sameAs: sameAs("password")
    }
  },
  methods: {
    emitInput: function(pending = false) {
      this.$emit("update:password", {
        password: this.password,
        error: this.$v.$anyError,
        valid: !this.$v.password.$invalid
      });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
