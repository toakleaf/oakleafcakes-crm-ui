<template>
  <div class="card-content">
    <div class="content has-text-centered">
      <p>
        <span v-if="account.first_name && account.company_name" class="is-italic">
          <span class="icon">
            <i class="fas fa-store"></i>
          </span>
          {{account.company_name}}
          <br>
        </span>
        <span v-for="(email) in account.emails" :key="email.id + 'e'">
          <span>
            <a :href="'mailto:' + email.email">
              <span class="icon" v-if="email.is_primary">
                <i class="fas fa-star"></i>
              </span>
              {{email.email}}
            </a>
            <br>
          </span>
        </span>
        <span v-for="phone in account.phones" :key="phone.id + 'p'">
          <span class="icon" v-if="phone.is_primary">
            <i class="fas fa-star"></i>
          </span>
          {{phone.phone}}
          <span
            class="icon"
            v-if="phone.phone_type && phone.phone_type.toLowerCase() === 'home'"
          >
            <i class="fas fa-home"></i>
          </span>
          <span class="icon" v-if="phone.phone_type && phone.phone_type.toLowerCase() === 'mobile'">
            <i class="fas fa-mobile"></i>
          </span>
          <span class="icon" v-if="phone.phone_type && phone.phone_type.toLowerCase() === 'work'">
            <i class="fas fa-store"></i>
          </span>
          <span
            class="icon"
            v-if="phone.phone_type && phone.phone_type.toLowerCase() === 'emergency'"
          >
            <i class="fas fa-ambulance"></i>
          </span>
          <br>
        </span>
      </p>
      <app-card-dates :created="account.created_at" :updated="account.updated_at"/>
    </div>
  </div>
</template>

<script>
import CardDates from "@/components/AccountCard/CardDates.vue";

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
