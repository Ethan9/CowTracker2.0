<template>
  <div class="login">
    <Navigation></Navigation>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <h3>Sign In</h3>
          <b-form>
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input id="input-1" v-model="email" type="email" required placeholder="Email"></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
              <b-form-input
                id="input-2"
                type="password"
                v-model="password"
                required
                placeholder="Password"
              ></b-form-input>
            </b-form-group>
            <b-button @click="login">Connection</b-button>
            <p>
              You don't have an account ? You can
              <router-link class="underline" to="/sign-up">create one</router-link>
            </p>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Navigation from '@/components/Nav'

export default {
  name: 'login',
  components: {
    Navigation: Navigation
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace('home')
          },
          err => {
            alert('Oops. ' + err.message)
          }
        )
    },
    returnEmail: function () {
      var userEmail = this.email
      return userEmail
    }
  }
}
</script>

<style scoped>
.underline {
  text-decoration: underline;
}
</style>
