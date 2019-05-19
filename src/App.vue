<template>
  <section id="app" class="has-navbar-fixed-top">
    <img src="@/assets/img/logo_full_light.svg" class="watermark">
    <app-navbar/>
    <b-loading is-full-page :active.sync="isLoading" :can-cancel="true"></b-loading>
    <router-view/>
  </section>
</template>

<script>
import Navbar from "@/containers/Navbar.vue";
export default {
  components: {
    "app-navbar": Navbar
  },
  data: function() {
    return {
      isLoading: false
    };
  },

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setStatus") {
        switch (state.notifications.status) {
          case "success":
            if (!state.notifications.showNotifications) return;
            this.isLoading = false;
            return this.$toast.open({
              message: state.notifications.successMessage,
              position: "is-bottom",
              type: "is-success",
              duration: state.notifications.successMessageDuration
            });
          case "error":
            this.isLoading = false;
            if (!state.notifications.showNotifications) return;
            return this.$toast.open({
              message: state.notifications.errorMessage,
              position: "is-bottom",
              type: "is-danger",
              duration: state.notifications.errorMessageDuration
            });
          case "pending":
            if (!state.notifications.showLoadingOverlay) return;
            return (this.isLoading = true);
        }
      }
    });
  }
};
</script>


<style lang="scss">
// CSS Debugger File:
// @import "./assets/styles/debug.css";
body {
  background-color: #6b6051;
  min-height: 100vh;
}
.pad-top {
  padding-top: 72px;
}
.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  z-index: 0;
  width: 25%;
  transform: translate(-50%, -50%);
}
</style>
