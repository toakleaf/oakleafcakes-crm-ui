<template>
  <div class="box">
    <app-primary-info/>
    <app-secondary-info/>
  </div>
</template>
<script>
import PrimaryInfo from "@/components/Customers/CustomerForm/PrimaryInfo.vue";
import SecondaryInfo from "@/components/Customers/CustomerForm/SecondaryInfo.vue";
export default {
  name: "CustomerForm",
  components: {
    "app-primary-info": PrimaryInfo,
    "app-secondary-info": SecondaryInfo
  }
};
</script>


<style lang="scss" scoped>
</style>


