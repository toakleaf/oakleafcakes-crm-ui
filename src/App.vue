<template>
  <section id="app" class="has-navbar-fixed-top">
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
      console.log("ho");
      if (mutation.type === "setStatus") {
        switch (state.status) {
          case "success":
            if (!state.showToast) return;
            console.log("hi");
            this.isLoading = false;
            return this.$toast.open({
              message: state.successMessage,
              position: "is-bottom",
              type: "is-success",
              durration: 3000
            });
          case "error":
            this.isLoading = false;
            if (!state.showToast) return;
            return this.$toast.open({
              message: state.errorMessage,
              position: "is-bottom",
              type: "is-danger",
              durration: 4000
            });
          case "pending":
            if (!state.showLoadingOverlay) return;
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
</style>
