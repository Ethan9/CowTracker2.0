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
          <b-dropdown-item @click="profile">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-dropdown-item v-if="!user" @click="sign-up">Sign Up</b-dropdown-item>
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
        },
        {
          id: 2,
          text: 'Scan',
          page: '/scan-screen'
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
    },
    profile: function () {
      this.$router.replace('profile')
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
