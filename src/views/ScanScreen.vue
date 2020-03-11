<template>
  <div>
    <Navigation></Navigation>
    <router-view />
    <em id="farmID">{{ user.email }}</em>
    <b-button @click="pullData">Test</b-button>
  </div>
</template>

<script>
import Navigation from '@/components/Nav'
import { db } from '@/main.js'
import { mapGetters, Store } from 'vuex'

export default {
  name: 'cowtracker',
  components: {
    Navigation: Navigation
  },
  methods: {
    pullData: function () {
      var farmID = toString(Store.mapGetters.farmID)
      db.collection('farmID').doc(toString(farmID)).get().then((snapshot) => {
        console.log(snapshot.docs)
      })
    }
  },
  data: function () {
    return {
      system: '',
      farmName: '',
      county: '',
      country: '',
      farmID: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>
