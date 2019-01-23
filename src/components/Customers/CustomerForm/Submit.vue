<template>
  <div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="Referral Source">
        <span class="icon is-left">
          <i class="fas fa-comments"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <button class="button is-primary is-fullwidth is-rounded">
        <p class="has-icons-left">
          <i class="fas fa-user-plus"></i>
          Create Customer
        </p>
      </button>
    </div>
    <div class="field">
      <button class="button is-dark is-fullwidth is-rounded">
        <p class="has-icons-left">
          <i class="fas fa-user-edit"></i>
          Update Customer
        </p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Submit"
};
</script>


<style lang="scss" scoped>
</style>
