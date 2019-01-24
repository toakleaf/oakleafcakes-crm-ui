<template>
  <div class="field has-addons is-grouped is-grouped-multiline">
    <p class="control is-marginless">
      <a class="button">
        <span class="icon is-large">
          <i class="fas fa-lg fa-angle-double-left"></i>
        </span>
      </a>
    </p>
    <div class="control dropdown is-hoverable is-marginless">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
          <span>{{start.toDateString()}}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu4" role="menu">
        <div class="dropdown-content">
          <div class="dropdown-item">
            <p>{{start.toDateString()}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="control dropdown is-hoverable is-marginless">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
          <span>{{end.toDateString()}}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu4" role="menu">
        <div class="dropdown-content">
          <div class="dropdown-item">
            <p>{{end.toDateString()}}</p>
          </div>
        </div>
      </div>
    </div>
    <p class="control">
      <a class="button">
        <span class="icon is-large">
          <i class="fas fa-lg fa-angle-double-right"></i>
        </span>
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  props: ["start", "end"]
};
</script>


<style lang="scss" scoped>
</style>
