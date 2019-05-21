<template>
  <b-collapse class="card" aria-id="contentIdForA11y3">
    <div
      slot="trigger"
      slot-scope="props"
      class="card-header"
      role="button"
      aria-controls="contentIdForA11y3"
    >
      <p class="card-header-title">
        <span class="icon is-medium">
          <i class="fas fa-clipboard-list fa-lg"></i>
        </span>
        Preferences
      </p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'chevron-down' : 'chevron-up'" pack="fa"></b-icon>
      </a>
    </div>
    <div class="card-content">
      <div class="field">
        <b-switch
          size="is-small"
          v-model="showNotifications"
          @input="pushPreferences"
        >Show Notifications</b-switch>
      </div>
      <div class="field has-addons" v-if="showNotifications">
        <p class="control">
          <a class="button is-static is-small">Message Durration</a>
        </p>
        <p class="control is-expanded">
          <input
            class="input is-small"
            type="text"
            v-model="successMessageDuration"
            @blur="pushPreferences"
          >
        </p>
      </div>
      <div class="field has-addons" v-if="showNotifications">
        <p class="control">
          <a class="button is-static is-small">Error Durration</a>
        </p>
        <p class="control is-expanded">
          <input
            class="input is-small"
            type="text"
            v-model="errorMessageDuration"
            @blur="pushPreferences"
          >
        </p>
      </div>
      <div class="field">
        <b-switch
          v-model="showLoadingOverlays"
          size="is-small"
          @input="pushPreferences"
        >Show Loading Overlays</b-switch>
      </div>
    </div>
  </b-collapse>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PreferenceCard",
  data: function() {
    return {
      editing: false,
      disabled: true,
      update: null
    };
  },
  computed: {
    showNotifications: {
      get() {
        return this.$store.getters.showNotifications;
      },
      set(value) {
        this.$store.commit("setShowNotifications", value);
      }
    },
    showLoadingOverlays: {
      get() {
        return this.$store.getters.showLoadingOverlays;
      },
      set(value) {
        this.$store.commit("setShowLoadingOverlays", value);
      }
    },
    successMessageDuration: {
      get() {
        return this.$store.getters.successMessageDuration;
      },
      set(value) {
        this.$store.commit("setSuccessMessageDuration", value);
      }
    },
    errorMessageDuration: {
      get() {
        return this.$store.getters.errorMessageDuration;
      },
      set(value) {
        this.$store.commit("setErrorMessageDuration", value);
      }
    }
  },
  methods: {
    ...mapActions(["fetchPreferences", "pushPreferences"])
  }
};
</script>


<style lang="scss" scoped>
</style>
