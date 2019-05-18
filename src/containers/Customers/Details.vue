<template>
  <div class="columns is-multiline">
    <div class="column is-two-thirds">
      <app-account-card :account="$store.getters.currentCustomer"/>
    </div>
    <div class="column is-full">
      <app-account-history-card :account="$store.getters.currentCustomer" :open="false"/>
    </div>
  </div>
</template>
<script>
import AccountCard from "@/containers/AccountCard.vue";
import AccountHistoryCard from "@/containers/AccountHistoryCard.vue";

export default {
  name: "SecondaryInfo",
  components: {
    "app-account-history-card": AccountHistoryCard,
    "app-account-card": AccountCard
  },
  data: function() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>


<style lang="scss" scoped>
</style>
