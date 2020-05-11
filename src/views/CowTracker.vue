<template>
  <div id="cow">
    <Navigation></Navigation>
    <div>
      <b-card no-body>
    <b-tabs card>
      <b-tab title="Live Feed" active>
        <b-card-text>
          <h3>Data from most recent scan</h3>
          <b-table striped hover :items="tableData"></b-table>
        </b-card-text>
      </b-tab>
      <b-tab title="Dashboard">
        <b-card-text>
          <h3> A graph showing the number of scans vs. time</h3>
           <div class="small">
              <line-chart :chart-data="datacollection"></line-chart>
            </div>
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
import LineChart from '@/views/LineChart.js'
var parsed

export default {
  name: 'cowtracker',
  components: {
    'Navigation': Navigation,
    LineChart
  },
  methods: {
    pullData: async function () {
      try {
        var farmQuery = await db.collection('farms').where('email', '==', this.user.email).get()
        var farmDocID = farmQuery.docs[0].id
        var scanQuery = await db.collection('farms').doc(farmDocID).collection('scans').orderBy('dateTime', 'desc').get()
        var scanDocID = scanQuery.docs[0].id
        this.unsubscribeTagListener = db.collection('farms').doc(farmDocID).collection('scans').doc(scanDocID).collection('cows').orderBy('dateTime')
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
        this.tagTime.push(change.doc.data().dateTime.slice(0, 8))
        this.tagNum.push(parseInt(change.doc.data().currentCowNumber))
        this.tableData.push(change.doc.data())
      }
    },
    fillData: function () {
      this.datacollection = {
        labels: this.tagTime,
        labelString: 'Time',
        datasets: [
          {
            label: 'Scans',
            backgroundColor: '#17a2b8',
            pointBackgroundColor: 'black',
            data: this.tagNum,
            labelString: 'Time'
          }
        ]
      }
    },
    getRandomInt: function () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  data: function () {
    return {
      tableData: [],
      tagTime: [],
      tagNum: [],
      datacollection: null,
      unsubscribeTagListener: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  created: function () {
    this.pullData()
    this.fillData()
  },
  beforeDestroy () {
    this.unsubscribeTagListener()
  }
}
</script>

<style>
 .small {
    max-width: 600px;
    margin:  50px auto;
  }
</style>
