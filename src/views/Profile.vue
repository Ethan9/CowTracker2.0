<template>
  <div>
    <Navigation></Navigation>
    <router-view />
    <div>
      <b-form @submit.prevent="saveData">
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="Profile"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Farm Name:"
              label-align-sm="right"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="farmName"
                type="farmName"
                required
                placeholder="Name of Farm"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Farm ID:"
              label-align-sm="right"
              label-for="input-2"
              description="The code on your farm ID card"
            >
              <b-form-input
                id="input-2"
                v-model="farmID"
                type="farmID"
                required
                placeholder="Farm ID code"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="County:"
              label-align-sm="right"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="county"
                type="county"
                required
                placeholder="County"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Country:"
              label-align-sm="right"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                v-model="country"
                type="country"
                required
                placeholder="Country"
              ></b-form-input>
            </b-form-group>
          </b-form-group>
          <b-button type="submit">Save</b-button>
        </b-card>
      </b-form>
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
    saveData: async function () {
      this.$store.commit('setFarmID', this.farmID)
      this.$store.commit('setFarmName', this.farmName)
      var farmQuery = await db.collection('farms').where('email', '==', this.user.email).get()
      var farmDocID = farmQuery.docs[0].id
      console.log(farmDocID)
      db.collection('farms')
        .doc(farmDocID)
        .set({
          farmName: this.farmName,
          county: this.county,
          country: this.country,
          farmID: this.farmID
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
    loadData: async function () {
      var farmQuery = await db.collection('farms').where('email', '==', this.user.email).get()
      var farmDocID = farmQuery.docs[0].id
      db.collection('farms')
        .doc(farmDocID)
        .get()
        .then(doc => {
          var input1 = document.getElementById('input-1')
          var input2 = document.getElementById('input-2')
          var input3 = document.getElementById('input-3')
          var input4 = document.getElementById('input-4')

          if (input1 != null || input2 != null || input3 != null || input4 != null) {
            input1.placeholder = doc.data().farmName
            input2.placeholder = doc.data().farmID
            input3.placeholder = doc.data().county
            input4.placeholder = doc.data().country
          } else {
            input1.placeholder = document.getElementById('input-1').placeholder
            input2.placeholder = document.getElementById('input-2').placeholder
            input3.placeholder = document.getElementById('input-3').placeholder
            input4.placeholder = document.getElementById('input-4').placeholder
          }
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
  watch: {
    saveData () {
      this.$router.push('scan')
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  created: function () {
    this.loadData()
  }
}
</script>
