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
                <i class="far fa-star"></i>
              </span>
              <span class="icon" v-else>
                <i class></i>
              </span>
              {{email.email}}
            </a>
            <br>
          </span>
        </span>
        <span v-for="phone in account.phones" :key="phone.id + 'p'">
          <span class="icon" v-if="phone.is_primary">
            <i class="far fa-star"></i>
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
      <nav class="level card-dates is-desktop">
        <div class="level-item has-text-centered">
          <p class="is-size-7" style="padding: 0 .25em 0 .25em">
            Created:
            <span class="has-text-grey">{{account.created_at.toLocaleString()}}</span>
          </p>
        </div>
        <div class="level-item has-text-centered" style="padding: 0 .25em 0 .25em">
          <p
            v-if="account.created_at.toLocaleString() !== account.updated_at.toLocaleString()"
            class="is-size-7"
          >
            Updated:
            <span class="has-text-grey">{{account.updated_at.toLocaleString()}}</span>
          </p>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayCard",
  props: ["account"],
  data: function() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>


<style lang="scss" scoped>
.card-dates {
  line-height: 90%;
  margin: 0 0 -1em 0;
}
</style>
