<template>
  <div class="navBar">
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>CowTracker</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav left>
        <b-nav-item>
        <router-link class="spacing" v-for="routes in links"
        v-bind:key="routes.id"
        :to="`${routes.page}`">{{routes.text}}</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="user" class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em id="email">{{ user.email }}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-dropdown-item v-if="!user"> <router-link to="/sign-up"> Sign in </router-link></b-dropdown-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase'
import { mapGetters } from 'vuex'
// import login from '@/views/Login.vue'

// var email = login.returnEmail

export default {
  name: 'Navigation',
  data () {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page: '/home'
        },
        {
          id: 1,
          text: 'Cows',
          page: '/cow'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style>
  .spacing {
    Margin-right: 10px;
    text-decoration: slateblue;
  }
  b-navbar {
    color: black;
  }
  a {
    color: black;
  }
</style>
