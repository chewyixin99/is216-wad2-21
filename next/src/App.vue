<template>
  <div>
    <TheNavigationBar v-if="!navigation"/>
    <router-view/>

    <TheFooter style="position: fixed; bottom: 0;"/>
  </div>

</template>


<script>

import TheNavigationBar from './components/TheNavigationBar.vue';
import TheFooter from './components/TheFooter.vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

  // the code below is to prevent navigation bar from appearing in the route names

export default {

  name: 'app',
  components: {TheNavigationBar, TheFooter},
  data() {
    return {
      navigation: null,
    };
  },
  created() {           
    
    // WHEN USER LOGS IN, FIREBASE DATA WILL BE RETRIEVED AND KEPT IN STORE
   
    firebase.auth().onAuthStateChanged((user)=>{
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
        console.log(this.$store.state.profileEmail);
        console.log("user email");
      }
    })
    this.checkRoute();
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