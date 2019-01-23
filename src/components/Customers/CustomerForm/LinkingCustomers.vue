<template>
  <div>
    <div class="field">
      <div class="control">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="Business Name">
          <span class="icon is-left">
            <i class="fas fa-building"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="Find Customer to Link">
          <span class="icon is-left">
            <i class="fas fa-user-friends"></i>
          </span>
        </p>
      </div>
    </div>
    <a class="button is-small is-dark is-fullwidth is-rounded is-outlined">
      <span class="icon is-small">
        <i class="fas fa-user-friends"></i>
      </span>
      <span>Create Customer to Link</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "LinkingCustomers"
};
</script>


<style lang="scss" scoped>
</style>
