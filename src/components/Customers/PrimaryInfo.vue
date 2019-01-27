<template>
  <div class="columns is-variable is-1">
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="First Name">
          <span class="icon is-left">
            <i class="fas fa-user-astronaut"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Last Name">
          <span class="icon is-left">
            <i class="fas fa-user-astronaut"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="@mail">
          <span class="icon is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Phone">
          <span class="icon is-left">
            <i class="fas fa-phone"></i>
          </span>
        </p>
      </div>
    </div>
    <div v-if="!userLoaded" class="column is-narrow">
      <p class="button is-primary">
        <i class="fas fa-user-plus"></i>
      </p>
    </div>
    <div v-else class="column is-narrow">
      <p class="button is-primary is-outlined">
        <i class="fas fa-user-edit"></i>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "PrimaryInfo",
  data: function() {
    return {
      userLoaded: false
    };
  }
};
</script>


<style lang="scss" scoped>
</style>
