import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

let app = ''

firebase.initializeApp({
  apiKey: 'AIzaSyArwQyr27jLG9laV0FJskxa1zuubrXQxeo',
  authDomain: 'cowtracker-5b405.firebaseapp.com',
  databaseURL: 'https://cowtracker-5b405.firebaseio.com',
  projectId: 'cowtracker-5b405',
  storageBucket: 'cowtracker-5b405.appspot.com',
  messagingSenderId: '656494149585',
  appId: '1:656494149585:web:bf8406b22e857bb897eaf0',
  measurementId: 'G-JFNHBR45PD'
})

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store: store,
      render: h => h(App)
    }).$mount('#app')
  }
})
