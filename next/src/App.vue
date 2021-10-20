<template>
  <Navigation/>
  <router-view/>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'app',
  components: {Navigation}

}
</script>

<style>

</style>