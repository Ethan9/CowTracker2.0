<template>
  <div id="cow">
    <Navigation></Navigation>
    <HelloWorld msg="Cows"/>
    <button @click="logout">Logout</button>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Navigation from '@/components/Nav'

export default {
  name: 'cowtracker',
  components: {
    HelloWorld,
    'Navigation': Navigation
  }
}
</script>
