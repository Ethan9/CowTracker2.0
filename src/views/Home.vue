<template>
  <div id="home">
    <div class="bg-img">
      <div class="container">
        <Navigation></Navigation>
      </div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">Logout</button>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
import HelloWorld from '@/components/HelloWorld.vue'
import Navigation from '@/components/Nav'

export default {
  name: 'home',
  components: {
    HelloWorld,
    'Navigation': Navigation
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style>
/* The hero image */
.bg-img {
  /* The image used */
  background-image: url("/cow-header.jpg");

  min-height: 380px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /* Needed to position the navbar */
  position: relative;
}

/* Position the navbar container inside the image */
.container {
  position: absolute;
  margin: 20px;
  width: auto;
}

</style>
