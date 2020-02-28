<template>
  <div id="cow">
    <Navigation></Navigation>
    <HelloWorld msg="Cows"/>
    {{system}}
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Navigation from '@/components/Nav'
import firebase from 'firebase'
import { db } from '@/main'

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
  },
  data: function () {
    return {
      system: ''
    }
  },
  created () {
    db.ref('farmid/cows/').once('value', storedValue => { this.system = storedValue })
  }
}
</script>
