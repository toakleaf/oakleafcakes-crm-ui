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
          <input class="input is-small" type="text" placeholder="Business Phone">
          <span class="icon is-left">
            <i class="fas fa-phone"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="Business Email">
          <span class="icon is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>
    </div>

    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="Business Address">
        <span class="icon is-small is-left">
          <i class="far fa-address-card"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="Business City">
        <span class="icon is-small is-left">
          <i class="far fa-address-card"></i>
        </span>
      </p>
    </div>
    <div class="field has-addons">
      <app-state-selector/>
      <span class="select is-small">
        <select>
          <option>US</option>
          <option>EU</option>
          <option>UK</option>
        </select>
      </span>
      <p class="control is-expanded">
        <input class="input is-small" type="text" placeholder="Business Zip">
      </p>
    </div>
  </div>
</template>
<script>
import StateSelector from "@/components/widgets/StateSelector.vue";
export default {
  name: "BusinessInfo",
  components: {
    "app-state-selector": StateSelector
  }
};
</script>


<style lang="scss" scoped>
</style>

