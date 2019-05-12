<template>
  <div class="card-content">
    <div class="content has-text-centered" v-for="(login) in account.logins" :key="login.id + 'e'">
      <span>
        <span class="icon" v-if="login.is_active">
          <i class="fas fa-check-circle"></i>
        </span>
        {{login.email}}
        <br>
      </span>
      <app-card-dates :created="login.created_at" :updated="login.updated_at"/>
    </div>
  </div>
</template>

<script>
import CardDates from "@/components/LoginCard/CardDates.vue";

export default {
  components: {
    "app-card-dates": CardDates
  },
  name: "DisplayCard",
  props: ["account"]
};
</script>


<style lang="scss" scoped>
</style>
