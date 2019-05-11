<template>
  <div class="card-content">
    <div class="content">
      <div class="field">
        <label class="label">Name</label>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input is-small"
                type="text"
                placeholder="First Name"
                v-model="firstName"
                @input="emitUpdates()"
              >
              <span class="icon is-left">
                <i class="fas fa-user-astronaut"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input is-small"
                type="text"
                placeholder="Last Name"
                v-model="lastName"
                @input="emitUpdates()"
              >
              <span class="icon is-left">
                <i class="fas fa-user-astronaut"></i>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Company</label>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input is-small"
            type="text"
            placeholder="Company Name"
            v-model="companyName"
            @input="emitUpdates()"
          >
          <span class="icon is-left">
            <i class="fas fa-crow"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <label class="label">Emails</label>
      </div>
      <div
        class="field is-grouped is-grouped-multiline"
        v-for="(email, i) in account.emails"
        :key="email.id + 'e'"
      >
        <div class="control">
          <b-radio
            v-model="primaryEmail"
            size="is-small"
            :native-value="email.email"
            @input="emitUpdates()"
          >Primary</b-radio>
        </div>
        <app-email-check
          :emailAddress="email.email"
          size="is-small"
          @update:emailAddress="updateEmail(i, ...arguments)"
        />
      </div>
      <div class="field">
        <label class="label">Phone Numbers</label>
      </div>

      <div
        class="field is-grouped is-grouped-multiline"
        v-for="(phone, i) in account.phones"
        :key="phone.id + 'p'"
      >
        <div class="control">
          <b-radio
            v-model="primaryPhone"
            size="is-small"
            :native-value="phone.phone"
            @input="emitUpdates()"
          >Primary</b-radio>
        </div>
        <app-phone-check
          :phoneNumber="phone.phone"
          :phoneNumberType="phone.phone_type"
          :phoneNumberCountry="phone.phone_country"
          size="is-small"
          @update:phoneNumber="updatePhone(i, ...arguments)"
        />
      </div>
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
</template>

<script>
import EmailCheck from "@/components/Form/EmailCheck.vue";
import PhoneCheck from "@/components/Form/PhoneCheck.vue";
import { required, requiredIf } from "vuelidate/lib/validators";

export default {
  components: {
    "app-email-check": EmailCheck,
    "app-phone-check": PhoneCheck
  },
  name: "EditCard",
  props: ["account"],
  data: function() {
    return {
      error: false,
      firstNameUpdate: null,
      lastNameUpdate: null,
      companyNameUpdate: null,
      emailUpdates: [],
      primaryEmailUpdate: null,
      phoneUpdates: [],
      primaryPhoneUpdate: null
    };
  },
  computed: {
    firstName: {
      get: function() {
        return this.firstNameUpdate
          ? this.firstNameUpdate.first_name
          : this.account.first_name;
      },
      set: function(val) {
        this.firstNameUpdate = { first_name: val };
      }
    },
    lastName: {
      get: function() {
        return this.lastNameUpdate
          ? this.lastNameUpdate.last_name
          : this.account.last_name;
      },
      set: function(val) {
        this.lastNameUpdate = { last_name: val };
      }
    },
    companyName: {
      get: function() {
        return this.companyNameUpdate
          ? this.companyNameUpdate.company_name
          : this.account.company_name;
      },
      set: function(val) {
        this.companyNameUpdate = { company_name: val };
      }
    },
    primaryEmail: {
      get: function() {
        return this.primaryEmailUpdate
          ? this.primaryEmailUpdate
          : this.account.emails.filter(e => e.is_primary)[0].email;
      },
      set: function(val) {
        this.primaryEmailUpdate = val;
      }
    },
    primaryPhone: {
      get: function() {
        return this.primaryPhoneUpdate
          ? this.primaryPhoneUpdate
          : this.account.phones.filter(p => p.is_primary)[0].phone;
      },
      set: function(val) {
        this.primaryPhoneUpdate = val;
      }
    }
  },
  validations: {
    first_name: {
      required: requiredIf(function() {
        return !this.companyName;
      })
    },
    companyName: {
      required: requiredIf(function() {
        return !this.firstName;
      })
    }
  },
  methods: {
    updateEmail: function(i, val) {
      this.emailUpdates = this.emailUpdates.filter(
        e => e.current_email !== this.account.emails[i].email
      );
      this.emailUpdates.push({
        current_email: this.account.emails[i].email,
        new_email: val.email
      });
      this.error = val.error;
      this.emitUpdates();
    },
    updatePhone: function(i, val) {
      this.phoneUpdates = this.phoneUpdates.filter(
        p => p.current_phone !== this.account.phones[i].phone
      );
      this.phoneUpdates.push({
        current_phone: this.account.phones[i].phone,
        new_phone: val.phone,
        phone_type: val.phone_type,
        phone_country: val.phone_country
      });
      this.error = val.error;
      this.emitUpdates();
    },
    emitUpdates: function() {
      if (this.primaryEmailUpdate) {
        if (this.emailUpdates.length > 0) {
          this.emailUpdates = this.emailUpdates.map(e => {
            return e.new_email === this.primaryEmailUpdate ||
              e.current_email === this.primaryEmailUpdate
              ? { ...e, is_primary: true }
              : { ...e, is_primary: false };
          });
        } else {
          this.emailUpdates.push({
            current_email: this.primaryEmailUpdate,
            is_primary: true
          });
        }
      }
      if (this.primaryPhoneUpdate) {
        if (this.phoneUpdates.length > 0) {
          this.phoneUpdates = this.phoneUpdates.map(p => {
            return p.new_phone === this.primaryPhoneUpdate ||
              p.current_phone === this.primaryPhoneUpdate
              ? { ...p, is_primary: true }
              : { ...p, is_primary: false };
          });
        } else {
          this.phoneUpdates.push({
            current_phone: this.primaryPhoneUpdate,
            is_primary: true
          });
        }
      }
      this.$emit("update:account", {
        update: {
          ...(this.firstNameUpdate ? this.firstNameUpdate : {}),
          ...(this.lastNameUpdate ? this.lastNameUpdate : {}),
          ...(this.companyNameUpdate ? this.companyNameUpdate : {}),
          ...(this.emailUpdates.length > 0
            ? { emails: this.emailUpdates }
            : {}),
          ...(this.phoneUpdates.length > 0 ? { phones: this.phoneUpdates } : {})
        },
        error: this.$v.$invalid || this.error
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.card-dates {
  line-height: 90%;
  margin: 1em 0 -1em 0;
}
</style>
