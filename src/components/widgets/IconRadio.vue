<template>
  <a
    @click="disabled ? null : $emit('input', nativeValue)"
    @mouseover="disabled ? null : hover = true"
    @mouseleave="hover = false"
    :class="{'cursor-disabled': disabled}"
  >
    <span
      v-if="value === nativeValue"
      class="icon"
      :class="{
        'has-text-primary': type === 'is-primary',
        'has-text-white': type === 'is-white',
        'has-text-black': type === 'is-black',
        'has-text-grey': type === 'is-grey',
        'has-text-grey-light': type === 'is-grey-light',
        'has-text-grey-dark': type === 'is-grey-dark',
        'has-text-danger': type === 'is-danger',
        'has-text-dark': type === 'is-dark',
        'has-text-warning': type === 'is-warning',
        'has-text-info': type === 'is-info',
        'has-text-link': type === 'is-link',
        'has-text-success': type === 'is-success',
        'is-small': size === 'is-small',
        'is-medium': size === 'is-medium',
        'is-large': size === 'is-large',
      }"
    >
      <i
        :class="[selectedIcon, {
          '': size === 'is-small',
          'fa-lg': size === '',
          'fa-2x': size === 'is-medium',
          'fa-3x': size === 'is-large',
        }]"
      ></i>
    </span>
    <span
      v-else
      class="icon"
      :class="{
        'has-text-primary': hover && type === 'is-primary',
        'has-text-white': hover && type === 'is-white',
        'has-text-black': hover && type === 'is-black',
        'has-text-grey': hover && type === 'is-grey',
        'has-text-grey-light': hover && type === 'is-grey-light',
        'has-text-grey-dark': hover && type === 'is-grey-dark',
        'has-text-danger': hover && type === 'is-danger',
        'has-text-dark': hover && type === 'is-dark',
        'has-text-warning': hover && type === 'is-warning',
        'has-text-info': hover && type === 'is-info',
        'has-text-link': hover && type === 'is-link',
        'has-text-success': hover && type === 'is-success',
        'is-small': size === 'is-small',
        'is-medium': size === 'is-medium',
        'is-large': size === 'is-large',
        'has-text-grey': !hover,
      }"
    >
      <i
        class="far fa-star"
        :class="[deselectedIcon, {
          '': size === 'is-small',
          'fa-lg': size === '',
          'fa-2x': size === 'is-medium',
          'fa-3x': size === 'is-large',
        }]"
      ></i>
    </span>
  </a>
</template>

<script>
export default {
  name: "StarRadio",
  props: {
    type: {
      default: "is-primary",
      type: String
    },
    size: {
      default: "",
      type: String
    },
    value: {
      default: "",
      type: String
    },
    nativeValue: {
      //native-value in template
      default: "",
      type: String
    },
    selectedIcon: {
      //selected-icon in template
      default: "fas fa-star",
      type: String
    },
    deselectedIcon: {
      //deselected-icon in template
      default: "far fa-star",
      type: String
    },
    disabled: {
      //deselected-icon in template
      default: false,
      type: Boolean
    }
  },
  data: function() {
    return {
      hover: false
    };
  }
};
</script>


<style lang="scss" scoped>
</style>
