<template>
  <section class="section pad-navbar">
    <div class="container">
      <app-customer-form/>
    </div>
  </section>
</template>

<script>
import CustomerForm from "@/components/Customers/CustomerForm/CustomerForm.vue";
export default {
  name: "customers",
  components: {
    "app-customer-form": CustomerForm
  }
};
</script>

<style lang="scss" scoped>
</style>

