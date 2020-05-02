<template>
  <div>
    <div onload="pulldata()">
      <Navigation></Navigation>
      <b-form @submit.prevent="saveVac">
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            :label="'Farm ID: ' + farmID"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-lg="3"
              label="Create new scan"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <b-form-group
                label-cols-sm="3"
                label="Vaccination name:"
                label-align-sm="right"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="vacName"
                  type="vacName"
                  required
                  placeholder="Name of Vaccination"
                ></b-form-input>
                </b-form-group>
              <b-form-group
                label-cols-sm="3"
                label="Number of Cows:"
                label-align-sm="right"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="cowNum"
                  type="cowNum"
                  required
                  placeholder="Number of Cows being Vaccinated"
                ></b-form-input>
                </b-form-group>
            </b-form-group>
          </b-form-group>
          <b-button type="submit" @click="showDiv()">Save</b-button>
        </b-card>
      </b-form>
    </div>
    <div id="welcomeDiv" style="display:none;">
      <p>Now refer to the tag reader</p>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Nav'
import { db } from '@/main.js'
import { mapGetters } from 'vuex'

export default {
  name: 'cowtracker',
  components: {
    Navigation: Navigation
  },
  methods: {
    pullData: async function () {
      var farmQuery = await db.collection('farms').where('email', '==', this.user.email).get()
      var farmDocID = farmQuery.docs[0].id
      db.collection('farms')
        .doc(farmDocID)
        .get()
        .then(doc => {
          this.farmID = doc.data().farmID
        })
    },
    saveVac: function () {
      db.collection('userEmail')
        .doc(this.user.email)
        .collection('vacName')
        .doc(this.vacName)
        .set(
          {
            vacVal: '1',
            cowNum: this.cowNum
          },
          { merge: true }
        )
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    showDiv: function () {
      document.getElementById('welcomeDiv').style.display = 'block'
    }
  },
  created: function () {
    this.pullData()
  },
  data: function () {
    return {
      system: '',
      vacName: '',
      county: '',
      country: '',
      farmID: '',
      cowNum: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>
