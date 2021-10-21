<template>
  <Navigation/>
  <router-view/>
</template>

<script>
  import Navigation from './components/TheNavigationBar.vue'

  export default {
    name: 'app',
    components: {Navigation}

  }
</script>

<style>

</style>