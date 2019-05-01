<template>
  <div>
    <div class="field">
      <label class="label">
        <p class="control">
          <b-field grouped group-multiline>
            <b-radio-button v-model="typeRadio" native-value="in-person" type="is-primary">
              <b-icon pack="fas" icon="user-friends"></b-icon>
              <span>In Person</span>
            </b-radio-button>

            <b-radio-button v-model="typeRadio" native-value="phone" type="is-twitter">
              <b-icon pack="fas" icon="phone"></b-icon>
              <span>Phone</span>
            </b-radio-button>

            <b-radio-button v-model="typeRadio" native-value="email" type="is-dark">
              <b-icon pack="fas" icon="envelope"></b-icon>
              <span>Email</span>
            </b-radio-button>

            <b-radio-button v-model="typeRadio" native-value="payment" type="is-success">
              <b-icon pack="fas" icon="dollar-sign"></b-icon>
              <span>Payment</span>
            </b-radio-button>
          </b-field>
        </p>
      </label>
      <p class="control">
        <textarea class="textarea" placeholder="Textarea"></textarea>
      </p>
    </div>
    <div class="field is-grouped is-grouped-multiline">
      <p class="control">Customer seemed:</p>
      <div class="control">
        <b-checkbox :value="true" type="is-success">Really Nice</b-checkbox>
      </div>
      <div class="control">
        <b-checkbox :value="true" type="is-success">Easy Going</b-checkbox>
      </div>
      <div class="control">
        <b-checkbox :value="false" type="is-warning">Very Picky</b-checkbox>
      </div>
      <div class="control">
        <b-checkbox :value="false" type="is-warning">Confused</b-checkbox>
      </div>
      <div class="control">
        <b-checkbox :value="false" type="is-warning">Upset</b-checkbox>
      </div>
      <div class="control">
        <b-checkbox :value="false" type="is-danger">Irredeemably Terrible</b-checkbox>
      </div>
    </div>
    <div class="control">
      <p class="button is-primary">+ Record Event</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InteractionsForm",
  data: function() {
    return {
      typeRadio: "in-person"
    };
  }
};
</script>


<style lang="scss" scoped>
</style>
