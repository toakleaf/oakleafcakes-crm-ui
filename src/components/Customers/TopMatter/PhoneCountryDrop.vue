<template class="hi">
  <p class="phoneCountryDrop">{{props.option}}</p>
</template>

<script>
export default {
  name: "PhoneCountryDrop",
  props: ["props"]
};
</script>

<style lang="scss" scoped>
.phoneCountryDrop {
  margin: -2px 0px -2px -10px;
  width: 1.5em;
  overflow: hidden;
}
</style>
