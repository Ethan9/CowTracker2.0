<template>
  <div id="home">
    <div>
      <Navigation></Navigation>
      <header class="masthead">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 text-center title">
              <h1 class="font-weight-light">Welcome to CowTracker</h1>
              <p class="lead">For All Your Cow Tracking Needs</p>
            </div>
          </div>
        </div>
      </header>
    <router-view />
    <b-card-footer>
      <p>An Ethan Lea Production</p>
    </b-card-footer>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Navigation from '@/components/Nav'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'home',
  components: {
    Navigation: Navigation
  },
  methods: {
    setUser: function () {
      this.$store.dispatch('setUser')
    },
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
    }
  }
}
</script>

<style>
/* The hero image */
.masthead {
  height: 90vh;
  min-height: 500px;
  background-image: url("https://www.risto-vending.com/user/pages/01.home/19._seo-text/milchautomaten-von-risto.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.title {
  color: white;
}

.content {
  padding-top: 5em;
}
</style>
