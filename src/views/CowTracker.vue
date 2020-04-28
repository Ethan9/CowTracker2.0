<template>
  <div id="cow">
    <Navigation></Navigation>
    <div>
      <b-card no-body>
    <b-tabs card>
      <b-tab title="Live Feed" active>
        <b-card-text>Tab contents 1</b-card-text>
      </b-tab>
      <b-tab title="Dashboard">
        <b-card-text>unsubscribe</b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Nav'
import firebase from 'firebase'
import { db } from '@/main'
import { mapGetters } from 'vuex'

export default {
  name: 'cowtracker',
  components: {
    'Navigation': Navigation
  },
  beforeDestroy () {
    this.unsubscribeTagListener()
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    pullData: function () {
      try {
        this.unsubscribeTagListener = db.collection('userEmail').doc(this.user.email).collection('vacName').doc('TB')
          .onSnapshot(function (doc) {
            console.log('Current data: ', doc.data())
          })
      } catch (error) {
        console.error(error)
        throw new Error(error.message)
      }
    }
  },
  data: function () {
    return {
      unsubscribeTagListener: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  created: function () {
    this.pullData()
  }
}
</script>
