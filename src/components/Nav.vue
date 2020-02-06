<template>
  <div>
    <nav>
      <router-link class="spacing" v-for="routes in links"
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
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
          text: 'Log in',
          page: '/login'
        },
        {
          id: 2,
          text: 'Sign Up',
          page: '/sign-up'
        },
        {
          id: 3,
          text: 'Cows',
          page: '/cow'
        }
      ]
    }
  }
}
</script>

<style>
  .spacing {
    Margin-right: 10px;
  }
</style>
