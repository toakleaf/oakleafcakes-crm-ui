<template>
  <b-collapse class="card" aria-id="contentIdForA11y3" v-if="account">
    <div
      slot="trigger"
      slot-scope="props"
      class="card-header"
      role="button"
      aria-controls="contentIdForA11y3"
    >
      <p
        class="card-header-title"
      >{{account.first_name ? (account.first_name + ' ' + account.last_name) : account.company_name ? account.company_name : null }}</p>
      <a class="card-header-icon">
        <span class="is-size-7 has-text-grey" style="margin-right: 1em;">{{account.role}}</span>
        <b-icon :icon="props.open ? 'chevron-down' : 'chevron-up'" pack="fa"></b-icon>
      </a>
    </div>
    <div class="card-content">
      <div class="content">
        <p>
          <span v-if="account.first_name && account.company_name" class="is-italic">
            <i class="fas fa-store"></i>
            {{account.company_name}}
            <br>
          </span>
          <span v-for="(email, i) in account.emails" :key="email.id + 'e'">
            <span v-if="!editing">
              <a :href="'mailto:' + email.email">
                <span class="icon" v-if="email.is_primary">
                  <i class="far fa-star"></i>
                </span>
                {{email.email}}
              </a>
              <br>
            </span>
            <b-radio
              v-if="editing"
              v-model="primaryEmail"
              size="is-small"
              :native-value="email.email"
            >Primary</b-radio>
            <app-email-check
              :emailAddress="email.email"
              v-if="editing"
              size="is-small"
              @update:emailAddress="updateEmail(i, ...arguments)"
            />
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
            <span
              class="icon"
              v-if="phone.phone_type && phone.phone_type.toLowerCase() === 'mobile'"
            >
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
        <p class="card-dates">
          <span class="is-size-7">Created: {{account.created_at.toLocaleString()}}</span>
          <span
            v-if="account.created_at.toLocaleString() !== account.updated_at.toLocaleString()"
            class="is-size-7"
          >
            <br>
            Updated: {{account.updated_at.toLocaleString()}}
          </span>
        </p>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item has-link-danger" @click="editing = false" v-if="editing">
        <span class="icon">
          <i class="far fa-save"></i>
        </span>
        Update
      </a>
      <a class="card-footer-item" @click="editing = false; clearUpdates()" v-if="editing">
        <span class="icon">
          <i class="fas fa-ban"></i>
        </span>
        Cancel
      </a>
      <a class="card-footer-item" @click="editing = true" v-if="!editing">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        Edit
      </a>
      <a class="card-footer-item" v-if="!editing">
        <span class="icon">
          <i class="far fa-plus-square"></i>
        </span>
        Email
      </a>
      <a class="card-footer-item" v-if="!editing">
        <span class="icon">
          <i class="far fa-plus-square"></i>
        </span>
        Phone
      </a>
    </footer>
  </b-collapse>
</template>

<script>
import EmailCheck from "@/components/Form/EmailCheck.vue";

export default {
  components: {
    "app-email-check": EmailCheck
  },
  name: "AccountCard",
  props: ["account"],
  data: function() {
    return {
      editing: false,
      errors: false,
      emailUpdates: [],
      primaryEmailUpdate: null
    };
  },
  computed: {
    primaryEmail: {
      get: function() {
        return this.primaryEmailUpdate
          ? this.primaryEmailUpdate
          : this.account.emails.filter(e => e.is_primary)[0].email;
      },
      set: function(val) {
        this.primaryEmailUpdate = val;
      }
    }
  },
  methods: {
    clearUpdates: function() {
      this.emailUpdates = [];
      this.primaryEmailUpdate = null;
    },
    updateEmail: function(i, val) {
      // console.log(this.account.emails[i].email);
      // console.log(val.email);
      this.emailUpdates = this.emailUpdates.filter(
        e => e.current_email !== this.account.emails[i].email
      );
      this.emailUpdates.push({
        current_email: this.account.emails[i].email,
        new_email: val.email
      });
      console.log(this.emailUpdates);
    }
  }
};
</script>


<style lang="scss" scoped>
.card-dates {
  line-height: 90%;
  margin: 0 0 -1em 0;
}
</style>
