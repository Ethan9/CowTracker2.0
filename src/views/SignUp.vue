<template>
  <div class="sign-up">
    <Navigation></Navigation>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <h3>Let's create a new account !</h3>
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
            <b-button @click="signUp">Connection</b-button>
          </b-form>
           <p>
              Already have an account? ? You can
              <router-link class="underline" to="/login">log in</router-link>
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Navigation from '@/components/Nav'
import { db } from '@/main'

export default {
  name: 'signUp',
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
    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace('profile')
            db.collection('farms').add({
              email: this.email
            })
              .then(function (docRef) {
                console.log('Document written with ID: ', docRef.id)
              })
              .catch(function (error) {
                console.error('Error adding document: ', error)
              })
          },
          function (err) {
            alert('Oops. ' + err.message)
          }
        )
    }
  }
}
</script>

<style scoped>
.underline {
  text-decoration: underline;
}
</style>
