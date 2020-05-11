import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import CowTracker from '@/views/CowTracker.vue'
import firebase from 'firebase'
import Profile from '@/views/Profile.vue'
import ScanScreen from '@/views/ScanScreen.vue'
import Maps from '@/views/Maps.vue'
import { mapGetters } from 'vuex'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/home',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      redirect: '/home',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/scan-screen',
      name: 'scanScreen',
      component: ScanScreen,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cow',
      name: 'cowtracker',
      component: CowTracker,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/maps',
      name: 'maps',
      component: Maps,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    const loginpath = window.location.pathname
    next({ name: 'login', query: { from: loginpath } })
  } else if (!requiresAuth && currentUser) {
    next('home')
  } else {
    next()
  }
})

export default router
