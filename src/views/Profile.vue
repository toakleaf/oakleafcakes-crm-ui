<template>
  <section class="container pad-route">
    <div class="box">
      <h1 class="title">My Account Profile</h1>
      <div class="columns is-multiline">
        <div class="column is-two-thirds">
          <app-account-card :account="$store.getters.author"/>
        </div>
        <div class="column">
          <app-preference-card :id="$store.getters.authorID"/>
        </div>
        <div class="column" v-if="$store.getters.author && $store.getters.author.updated_at">
          <app-account-history-card :account="$store.getters.author" :open="false"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AccountCard from "@/containers/AccountCard.vue";
import PreferenceCard from "@/containers/PreferenceCard.vue";
import AccountHistoryCard from "@/containers/AccountHistoryCard.vue";

export default {
  components: {
    "app-account-card": AccountCard,
    "app-preference-card": PreferenceCard,
    "app-account-history-card": AccountHistoryCard
  },
  name: "profile",
  data: function() {
    return {};
  },
  methods: {},
  beforeCreate() {
    //make sure author data is fresh on each load
    this.$store.dispatch("fetchAuthorData");
  }
};
</script>

<style lang="scss" scoped>
</style>

