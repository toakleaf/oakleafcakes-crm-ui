<template>
  <p class="is-size-7 searchResults">
    <span v-if="field === 'first_name'">
      <span>{{sliceText.before}}</span>
      <span class="has-text-weight-bold">{{sliceText.selected}}</span>
      <span>{{sliceText.after + " "}}</span>
    </span>
    <span v-else>{{props.option.first_name + " "}}</span>
    <span v-if="field === 'last_name'">
      <span>{{sliceText.before}}</span>
      <span class="has-text-weight-bold">{{sliceText.selected}}</span>
      <span>{{sliceText.after + " "}}</span>
    </span>
    <span v-else>{{props.option.last_name + " "}}</span>
    <span
      v-if="props.option.company_name && (field === 'first_name' || field === 'last_name')"
      class="searchCompany"
    >
      <i>
        <span>{{sliceCompanyName.before}}</span>
        <span class="has-text-weight-bold">{{sliceCompanyName.selected}}</span>
        <span>{{sliceCompanyName.after + " "}}</span>
      </i>
    </span>
    <span
      class="searchCompany"
      v-if="props.option.company_name && field !== 'first_name' && field !== 'last_name'"
    >
      <i>{{props.option.company_name}}</i>
    </span>
    <span v-if="field === 'phone'" class="is-pulled-right">
      <span>{{sliceText.before}}</span>
      <span class="has-text-weight-bold">{{sliceText.selected}}</span>
      <span>{{sliceText.after + " "}}</span>
    </span>
    <span v-else class="is-pulled-right">{{' ' + props.option.phone}}</span>
    <br>
    <span v-if="field === 'email'" class="searchIndent">
      <span>{{sliceText.before}}</span>
      <span class="has-text-weight-bold">{{sliceText.selected}}</span>
      <span>{{sliceText.after + " "}}</span>
    </span>
    <span v-else class="searchIndent">{{props.option.email}}</span>
  </p>
</template>

<script>
export default {
  name: "SearchDropdown",
  props: ["props", "field", "value"],
  computed: {
    sliceText: function() {
      if (!this.props.option[this.field] || !this.value)
        return { before: "", selected: "", after: "" };
      const i = this.props.option[this.field]
        .toLowerCase()
        .indexOf(this.value.toLowerCase());
      if (i < 0)
        return {
          before: this.props.option[this.field],
          selected: "",
          after: ""
        };
      return {
        before: this.props.option[this.field].slice(0, i),
        selected: this.props.option[this.field].slice(i, i + this.value.length),
        after: this.props.option[this.field].slice(i + this.value.length)
      };
    },
    sliceCompanyName: function() {
      // Because we search company_name simultaneous to first or last name searches
      if (!this.props.option.company_name || !this.value)
        return { before: "", selected: "", after: "" };
      const i = this.props.option.company_name
        .toLowerCase()
        .indexOf(this.value.toLowerCase());
      if (i < 0)
        return {
          before: this.props.option.company_name,
          selected: "",
          after: ""
        };
      return {
        before: this.props.option.company_name.slice(0, i),
        selected: this.props.option.company_name.slice(
          i,
          i + this.value.length
        ),
        after: this.props.option.company_name.slice(i + this.value.length)
      };
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
