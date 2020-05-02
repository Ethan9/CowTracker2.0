<template>
  <div id="cow">
    <Navigation></Navigation>
    <div>
      <b-card no-body>
    <b-tabs card>
      <b-tab title="Live Feed" active>
        <b-card-text>
          <b-table striped hover :items="tableData"></b-table>
        </b-card-text>
      </b-tab>
      <b-tab title="Dashboard">
        <b-card-text>
          <pi-chart></pi-chart>
        </b-card-text>
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
import { Bar } from 'vue-chartjs'
import PiChart from '@/components/PiChart'
var parsed

export default {
  name: 'cowtracker',
  components: {
    'Navigation': Navigation,
    PiChart
  },
  methods: {
    pullData: async function () {
      try {
        var farmQuery = await db.collection('farms').where('email', '==', this.user.email).get()
        var farmDocID = farmQuery.docs[0].id
        var scanQuery = await db.collection('farms').doc(farmDocID).collection('scans').orderBy('dateTime', 'desc').get()
        var scanDocID = scanQuery.docs[0].id
        var unsubscribeTagListener = db.collection('farms').doc(farmDocID).collection('scans').doc(scanDocID).collection('cows').orderBy('dateTime')
        // get right collection with email
        // access new scan
        // listen to cows collection
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(this.addToTableData)
          })
      } catch (error) {
        console.error(error)
        throw new Error(error.message)
      }
    },
    addToTableData: function (change) {
      if (change.type === 'added') {
        console.log('New tagid: ', change.doc.data())
        this.tableData.push(change.doc.data())
        console.log(this.tableData)
      }
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  created: function () {
    this.pullData()
  },
  beforeDestroy () {
    this.unsubscribeTagListener()
  }
}
</script>
