<template>
  <div id="cow">
    <Navigation></Navigation>
    <HelloWorld msg="Cows"/>
    <button @click="logout">Logout</button>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Navigation from '@/components/Nav'
import firebase from 'firebase'

export default {
  name: 'cowtracker',
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
