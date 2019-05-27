<template>
  <div class="menu">
    <p>
      <input type="text" value="Hello" size="5" maxlength="5">
    </p>
    <p>
      <select name="select">
        <option value="round">round</option>
        <option value="square">square</option>
        <option value="topsyturvy">topsy</option>
      </select>
    </p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
select,
select:focus {
  font-family: "Shadows Into Light Two", cursive;
  font-size: inherit;
  color: inherit;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  outline: 0;
  // border-bottom: 1pt solid;
  /* needed for Firefox: */
  overflow: hidden;
  width: auto;
  background: transparent;
  text-align: center;
  text-decoration: underline;
}

input,
input:focus {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  border: 0;
  // border-bottom: 1pt solid;
  outline: 0;
  background: transparent;
  margin: -2px;
  width: auto;
  text-align: center;
}
</style>

