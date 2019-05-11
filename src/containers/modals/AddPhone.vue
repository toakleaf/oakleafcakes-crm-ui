<template>
  <form action>
    <div class="modal-card modal-width">
      <header class="modal-card-head">
        <p class="subtitle">Add New Phone</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <app-phone-check @update:phone="updatePhone"/>
        </div>
        <div class="field">
          <b-checkbox v-model="isPrimary">Make Primary</b-checkbox>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" :disabled="!valid || error" @click="submitUpdates">
          <span class="icon">
            <i class="far fa-plus-square"></i>
          </span>
          <span>Phone</span>
        </a>
        <a class="button" @click="$parent.close()">
          <span class="icon">
            <i class="fas fa-ban"></i>
          </span>
          <span>Cancel</span>
        </a>
      </footer>
    </div>
  </form>
</template>

<script>
import PhoneCheck from "@/components/Form/PhoneCheck.vue";

export default {
  components: {
    "app-phone-check": PhoneCheck
  },
  props: ["id"],
  name: "AddPhone",
  data: function() {
    return {
      isPrimary: false,
      phone: null,
      phone_type: null,
      phone_country: "US",
      valid: false,
      error: true
    };
  },
  computed: {},
  methods: {
    updatePhone: function(val) {
      if (!val) return;
      this.phone = val.phone;
      this.phone_type = val.phone_type;
      this.phone_country = val.phone_country;
      this.valid = val.valid;
      this.error = val.error;
    },
    submitUpdates: function() {
      if (
        !(
          this.id &&
          this.valid &&
          !this.error &&
          this.phone &&
          this.phone_country
        )
      )
        return;
      this.$store
        .dispatch("pushAccountUpdate", {
          id: this.id,
          update: {
            phones: [
              {
                new_phone: this.phone,
                phone_country: this.phone_country,
                ...(this.phone_type ? { phone_type: this.phone_type } : {}),
                ...(this.isPrimary ? { is_primary: true } : {})
              }
            ]
          }
        })
        .then(() => {
          this.$parent.close();
          this.$toast.open({
            message: "Phone added successfully!",
            position: "is-bottom",
            type: "is-success"
          });
        })
        .catch(err => {
          this.$toast.open({
            message: "Failed to add new phone.",
            position: "is-bottom",
            type: "is-danger"
          });
          console.error(err);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.modal-width {
  width: auto;
  min-width: 20em;
}
</style>
