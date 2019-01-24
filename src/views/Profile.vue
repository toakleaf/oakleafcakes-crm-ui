<template>
  <section class="section pad-navbar">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <div class="box">
          <h1 class="title">User Profile</h1>
          <div class="columns is-centered">
            <div class="column is-three-quarters">
              <div class="field">
                <label class="label">User ID: 1</label>
              </div>
              <div class="field">
                <label class="label">Display Name</label>
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="Display Name">
                  <span class="icon is-left">
                    <i class="fas fa-crow"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">First Name</label>
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="First Name">
                  <span class="icon is-left">
                    <i class="fas fa-user-astronaut"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Last Name</label>
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="Last Name">
                  <span class="icon is-left">
                    <i class="fas fa-user-astronaut"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="@mail">
                  <span class="icon is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-primary">Update Profile</button>
                </div>
                <div class="control">
                  <button class="button is-text">change password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "profile"
};
</script>

<style lang="scss" scoped>
</style>

