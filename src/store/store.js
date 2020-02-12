import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getUserName: state => {
      return state.userName
    }
  },
  mutations: {
    setUser: state => {
      state.user = Firebase.auth().currentUser
    },
    setUserName: state => {
      state.userName = Firebase.auth().currentUser.email
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    },
    setUserName: context => {
      context.commit('setUserName')
    }
  }
})
