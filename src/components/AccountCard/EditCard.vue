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
        <a class="control" @click="$emit('deleteEmail', {email: email.email})">
          <b-tooltip label="Delete this email" type="is-danger">
            <span class="icon has-link-danger">
              <i class="fas fa-backspace fa-flip-horizontal"></i>
            </span>
          </b-tooltip>
        </a>
        <div class="control">
          <b-tooltip label="Mark this email as primary">
            <app-star-radio
              v-model="primaryEmail"
              :native-value="email.email"
              size="is-small"
              @input="emitUpdates()"
            ></app-star-radio>
          </b-tooltip>
        </div>
        <app-email-check
          :emailAddress="email.email"
          size="is-small"
          @update:email="updateEmail(i, ...arguments)"
        />
      </div>
      <nav class="level is-marginless">
        <div class="level-left"></div>
        <div class="level-right">
          <div class="level-item">
            <a class="is-size-7" @click="$emit('addEmail')">+Add Email</a>
          </div>
        </div>
      </nav>
      <div class="field">
        <label class="label">Phone Numbers</label>
      </div>
      <div
        class="field is-grouped is-grouped-multiline"
        v-for="(phone, i) in account.phones"
        :key="phone.id + 'p'"
      >
        <a class="control" @click="$emit('deletePhone', {phone: phone.phone})">
          <b-tooltip label="Delete this phone number" type="is-danger">
            <span class="icon has-link-danger">
              <i class="fas fa-backspace fa-flip-horizontal"></i>
            </span>
          </b-tooltip>
        </a>
        <div class="control">
          <b-tooltip label="Mark this phone number as primary">
            <app-star-radio
              v-model="primaryPhone"
              :native-value="phone.phone"
              size="is-small"
              @input="emitUpdates()"
            ></app-star-radio>
          </b-tooltip>
        </div>

        <app-phone-check
          :phoneNumber="phone.phone"
          :phoneNumberType="phone.phone_type"
          :phoneNumberCountry="phone.phone_country"
          size="is-small"
          :hasGlobe="false"
          @update:phone="updatePhone(i, ...arguments)"
        />
      </div>
      <nav class="level">
        <div class="level-left"></div>
        <div class="level-right">
          <div class="level-item">
            <a class="is-size-7" @click="$emit('addPhone')">+Add Phone</a>
          </div>
        </div>
      </nav>

      <app-card-dates :created="account.created_at" :updated="account.updated_at"/>
    </div>
  </div>
</template>

<script>
import EmailCheck from "@/components/Form/EmailCheck.vue";
import PhoneCheck from "@/components/Form/PhoneCheck.vue";
import StarRadio from "@/components/widgets/StarRadio.vue";
import CardDates from "@/components/AccountCard/CardDates.vue";
import { required, requiredUnless } from "vuelidate/lib/validators";

export default {
  components: {
    "app-email-check": EmailCheck,
    "app-phone-check": PhoneCheck,
    "app-star-radio": StarRadio,
    "app-card-dates": CardDates
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
          : this.account.emails.filter(e => e.is_primary).length
          ? this.account.emails.filter(e => e.is_primary)[0].email
          : null;
      },
      set: function(val) {
        this.primaryEmailUpdate = val;
      }
    },
    primaryPhone: {
      get: function() {
        return this.primaryPhoneUpdate
          ? this.primaryPhoneUpdate
          : this.account.phones.filter(p => p.is_primary).length
          ? this.account.phones.filter(p => p.is_primary)[0].phone
          : null;
      },
      set: function(val) {
        this.primaryPhoneUpdate = val;
      }
    }
  },
  validations: {
    firstName: {
      required: requiredUnless("companyName")
    },
    companyName: {
      required: requiredUnless("firstName")
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
            return e.new_email === this.primaryEmail ||
              e.current_email === this.primaryEmail
              ? { ...e, is_primary: true }
              : { ...e, is_primary: false };
          });
        }
        if (!this.emailUpdates.some(e => e.is_primary)) {
          this.emailUpdates.push({
            current_email: this.primaryEmail,
            is_primary: true
          });
        }
      }
      if (this.primaryPhoneUpdate) {
        if (this.phoneUpdates.length > 0) {
          this.phoneUpdates = this.phoneUpdates.map(p => {
            return p.new_phone === this.primaryPhone ||
              p.current_phone === this.primaryPhone
              ? { ...p, is_primary: true }
              : { ...p, is_primary: false };
          });
        }
        if (!this.phoneUpdates.some(p => p.is_primary)) {
          this.phoneUpdates.push({
            current_phone: this.primaryPhone,
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
</style>
