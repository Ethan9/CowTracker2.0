import Vue from 'vue'
import Vuex from 'vuex'

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
    },
    getFarmID: state => {
      return state.farmID
    }
  },
  mutations: {
    // setUser: state => {
    //   state.user = Firebase.auth().currentUser
    // },
    setUser: (state, user) => {
      // state.user = Firebase.auth().currentUser
      state.user = user
    },
    setFarmID: (state, farmID) => {
      state.farmID = farmID
    }
    // setUserName: state => {
    //   state.userName = Firebase.auth().currentUser.email
    // }
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
