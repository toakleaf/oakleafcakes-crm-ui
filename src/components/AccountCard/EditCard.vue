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
        <a
          class="control has-text-grey"
          @click="disableLogin(email.email) ? null : $emit('deleteEmail', {email: email.email})"
          :class="{'cursor-disabled': disableLogin(email.email)}"
        >
          <b-tooltip
            :label=" account.logins && account.logins.some(l => l.email === email.email) ? 'CAUTION! Deleting this email will also delete the user\'s login email and could prevent access!' : 'Delete this email'"
            type="is-danger"
            multilined
            position="is-right"
            :active="!disableLogin(email.email)"
          >
            <span class="icon" :class="{'has-link-danger': !disableLogin(email.email)}">
              <i class="fas fa-backspace fa-flip-horizontal"></i>
            </span>
          </b-tooltip>
        </a>
        <div class="control">
          <b-tooltip
            label="Mark this email as primary"
            position="is-right"
            :active="!preventLoginEdits"
          >
            <app-icon-radio
              v-model="primaryEmail"
              :native-value="email.email"
              size="is-small"
              @input="emitUpdates()"
              :disabled="preventLoginEdits"
            ></app-icon-radio>
          </b-tooltip>
        </div>

        <app-email-check
          :iconLeft="account.logins && account.logins.some(l => l.email === email.email) ? 'fas fa-sign-in-alt' : 'fas fa-envelope'"
          :disabled="disableLogin(email.email)"
          :emailAddress="email.email"
          size="is-small"
          @update:email="updateEmail(i, ...arguments)"
        />

        <p class="control" v-if="disableLogin(email.email)">
          <b-tooltip
            label="CAUTION! Editing this email will also alter the user's login email and could prevent access!"
            multilined
            type="is-danger"
          >
            <a class="has-text-danger is-size-7" @click="preventLoginEdits = false">Edit</a>
          </b-tooltip>
        </p>
        <p
          class="control"
          v-if="!preventLoginEdits && (account.logins && account.logins.some(l => l.email === email.email))"
        >
          <b-tooltip label="Magange login password options." multilined type="is-dark">
            <a class="is-size-7" @click="$emit('updatePassword', email.email)">Password</a>
          </b-tooltip>
        </p>
        <p
          class="control"
          v-if="!preventLoginEdits && (account.logins && account.logins.some(l => l.email === email.email && l.is_active))"
        >
          <b-tooltip
            label="Suspending this login email will block user from logging into their account (after the expiration of their browser token)."
            multilined
            type="is-danger"
          >
            <a class="has-text-danger is-size-7" @click="deactivateEmail(email.email)">Suspend</a>
          </b-tooltip>
        </p>
        <p
          class="control"
          v-if="!preventLoginEdits && (account.logins && account.logins.some(l => l.email === email.email && l.is_active === false))"
        >
          <b-tooltip
            label="This email has login credentials associated with it but is currently deactivated. Click to reactivate user's ability to login with this email."
            multilined
            type="is-danger"
          >
            <a class="has-text-danger is-size-7" @click="activateEmail(email.email)">Reactivate</a>
          </b-tooltip>
        </p>
      </div>
      <nav class="level is-marginless">
        <div class="level-left"></div>
        <div class="level-right">
          <div class="level-item">
            <a class="is-size-7" @click="$emit('addEmail')">+Add Email</a>
            <p style="padding: 0 .5em 0 .5em"></p>
            <a class="is-size-7" @click="$emit('addLogin')">+Add Login</a>
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
          <b-tooltip label="Delete this phone number" type="is-danger" position="is-right">
            <span class="icon has-link-danger">
              <i class="fas fa-backspace fa-flip-horizontal"></i>
            </span>
          </b-tooltip>
        </a>
        <div class="control">
          <b-tooltip label="Mark this phone number as primary" position="is-right" multilined>
            <app-icon-radio
              v-model="primaryPhone"
              :native-value="phone.phone"
              size="is-small"
              @input="emitUpdates()"
            ></app-icon-radio>
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
      <nav class="level is-marginless">
        <div class="level-left"></div>
        <div class="level-right">
          <div class="level-item">
            <a class="is-size-7" @click="$emit('addPhone')">+Add Phone</a>
          </div>
        </div>
      </nav>
      <div
        class="field"
        v-if="author && (author.role === 'ADMIN' || (author.role ==='EMPLOYEE' && account.role === 'CUSTOMER'))"
      >
        <label class="label">Account Access</label>
      </div>
      <div class="columns">
        <div class="column" v-if="author && author.role === 'ADMIN'">
          <div class="field">
            <div class="control">
              <div class="select is-fullwidth is-small">
                <select v-model="role">
                  <option value="ADMIN">ADMIN</option>
                  <option value="EMPLOYEE">EMPLOYEE</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="buttons is-centered">
            <b-tooltip
              label="Locking account will deactivate and reset password to a random string. To imediately block access, manually logout all users via system admin page."
              multilined
              type="is-danger"
              v-if="author && (author.role === 'ADMIN' || (author.role ==='EMPLOYEE' && account.role === 'CUSTOMER'))"
            >
              <a class="button is-danger is-outlined is-small" @click="$emit('lockAllLogins')">
                <span class="icon">
                  <i class="fas fa-user-lock"></i>
                </span>
                <span>Lock All Account Logins</span>
              </a>
            </b-tooltip>
          </div>
        </div>
      </div>

      <app-card-dates :created="account.created_at" :updated="account.updated_at"/>
    </div>
  </div>
</template>

<script>
import EmailCheck from "@/components/Form/EmailCheck.vue";
import PhoneCheck from "@/components/Form/PhoneCheck.vue";
import IconRadio from "@/components/widgets/IconRadio.vue";
import CardDates from "@/components/AccountCard/CardDates.vue";
import { required, requiredUnless } from "vuelidate/lib/validators";

export default {
  components: {
    "app-email-check": EmailCheck,
    "app-phone-check": PhoneCheck,
    "app-icon-radio": IconRadio,
    "app-card-dates": CardDates
  },
  name: "EditCard",
  props: ["account", "author"],
  data: function() {
    return {
      error: false,
      firstNameUpdate: null,
      lastNameUpdate: null,
      companyNameUpdate: null,
      emailUpdates: [],
      primaryEmailUpdate: null,
      phoneUpdates: [],
      primaryPhoneUpdate: null,
      preventLoginEdits: true,
      roleUpdate: null
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
    role: {
      get: function() {
        return this.roleUpdate ? this.roleUpdate.role : this.account.role;
      },
      set: function(val) {
        this.roleUpdate = { role: val };
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
    disableLogin: function(email) {
      return (
        this.preventLoginEdits &&
        (this.account.logins &&
          this.account.logins.some(l => l.email === email))
      );
    },
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
    deactivateEmail: function(val) {
      this.$emit("update:account", {
        update: { emails: [{ current_email: val, is_active: false }] },
        error: false
      });
      this.$emit("submitUpdates");
    },
    activateEmail: function(val) {
      this.$emit("update:account", {
        update: { emails: [{ current_email: val, is_active: true }] },
        error: false
      });
      this.$emit("submitUpdates");
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
          ...(this.roleUpdate ? this.roleUpdate : {}),
          ...(this.emailUpdates.length > 0
            ? { emails: this.emailUpdates }
            : {}),
          ...(this.phoneUpdates.length > 0 ? { phones: this.phoneUpdates } : {})
        },
        error: this.$v.$invalid || this.error
      });
    }
  },
  created: function() {
    if (this.account && this.account.logins && this.account.emails) {
      this.preventLoginEdits = this.account.logins.some(l =>
        this.account.emails.some(e => e.email === l.email)
      );
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
