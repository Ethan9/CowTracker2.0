import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

Vue.component('GmapCluster', GmapCluster)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDTpeu3lK__IjlSpoOqXu6IiD9KAUjiGDw',
    libraries: 'places'
  }
})

Vue.config.productionTip = false

let app = ''

firebase.initializeApp({
  apiKey: 'AIzaSyDTpeu3lK__IjlSpoOqXu6IiD9KAUjiGDw',
  authDomain: 'cowtracker-5b405.firebaseapp.com',
  databaseURL: 'https://cowtracker-5b405.firebaseio.com',
  projectId: 'cowtracker-5b405',
  storageBucket: 'cowtracker-5b405.appspot.com',
  messagingSenderId: '656494149585',
  appId: '1:656494149585:web:bf8406b22e857bb897eaf0',
  measurementId: 'G-JFNHBR45PD'
})

firebase.auth().onAuthStateChanged((user) => {
  store.commit('setUser', user)
})

export const db = firebase.firestore()

if (!app) {
  app = new Vue({
    router,
    created () {
    },
    store: store,
    render: h => h(App)
  }).$mount('#app')
}
