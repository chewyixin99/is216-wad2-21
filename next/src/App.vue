<template>
  <div>
    <TheNavigationBar v-if="!navigation"/>

    <router-view/>
  </div>

</template>


<script>

import TheNavigationBar from './components/TheNavigationBar.vue';
import firebase from 'firebase/compat/app';

  // the code below is to prevent navigation bar from appearing in the route names

export default {

  name: 'app',
  components: {TheNavigationBar},
  data() {
    return {
      navigation: null,
    };
  },
  created() {
    this.checkRoute();
    console.log(firebase.auth().currentUser);
  },
  methods: {
    checkRoute() {
      if (this.$route.name !== "Home" || this.$route.name !== "Profile" ||  this.$route.name !== "About"){
        this.navigation = false;
        return;
      }
      this.navigation = true;
    },
  },
  watch: {
    $route(){
      this.checkRoute()
    }
  }, 
}


</script>



<style>

</style>