<template>

<div class="container max-w-md mx-auto">
  <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 m-6">
  <form>
    <!-- FIRST NAME -->
    <div class="mb-4">
      <label class="block text-white text-sm font-bold mb-2" for="firstname">
        FIRST NAME
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" v-model="firstName" placeholder="First Name">
    </div>
     
    <!-- LAST NAME -->
    <div class="mb-4">
      <label class="block text-white text-sm font-bold mb-2" for="lastname">
        LAST NAME
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" v-model="lastName" placeholder="Last Name">
    </div>

    <!-- EMAIL -->
    <div class="mb-4">
      <label class="block text-white text-sm font-bold mb-2" for="email">
        EMAIL
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name="email" v-model="email" placeholder="Email">
    </div>

    <!-- PASSWORD -->
    <div class="mb-6">
      <label class="block text-white text-sm font-bold mb-2" for="password">
        PASSWORD
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" v-model="password" placeholder="Password">
    </div>

    <span class="text-white">By clicking sign up, I allow personal data to be retrieved by Next.</span>

    <!-- BUTTON -->
    <div class="mb-4 mt-4">
      <div class="error text-center text-red-500 mb-2">
        {{this.errorMsg}}
      </div>

      <button @click.prevent="signup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
        SIGN UP
      </button>
    </div>

    <!-- LOG IN LINK -->
    <div class="text-center text-white">
      <router-link class="router-link" :to="{name: 'LogIn'}">
      Already have an account? <span class="text-yellow-500">Log in</span></router-link>
    </div>

  </form>
  </div>
</div>
</template>

<!-- https://v1.tailwindcss.com/components/forms -->

<script>

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from "../firebase/firebaseInit";


export default {
    name: "SignUp",
data(){
    return{
        firstName: "",
        lastName: "",
        email: "",
        groupID: [],
        password: "",
        errorMsg : "",
        error: null,
        emailErr: ["@","."],
        createUser: null,

    };
},

methods:{
  async signup() {

      if (this.email == "" || this.password == "" || this.firstName == "" || this.lastName == "" ){
          this.error = true;
          this.errorMsg = "Please fill out all the fields!";
      }
      else if (!(this.email.includes("@"))){
          this.error = true;
          this.errorMsg = "Please enter a valid email!";
      }
      else if (!(this.email.includes("."))){
          this.error = true;
          this.errorMsg = "Please enter a valid email!";
      }
      else if (this.password.length < 6){
          this.error = true;
          this.errorMsg = "Password must be more than 6 characters!";
      }
      else{
          this.error = false;
          this.errorMsg = "";
          const firebaseAuth = await firebase.auth();
          try{
            this.createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
          }
          catch(e){          
            this.error = true;
            this.errorMsg = "Email has been used before!";
          }
          finally{
            if (!this.error){
              const result = await this.createUser;
              const dataBase = db.collection("users").doc(result.user.uid);
              this.$router.replace({name: "Onboarding"});
                await dataBase.set({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                groupID: this.groupID,
                experience: ``,
                favPlayer: ``,
                favTeam: ``,
                initialsURL: null,
                profileImg: null,
                checkedInCourt: "",
              })
                .then(()=>{
                  return this.$store.commit("setProfileInitials")
                })
                .then(()=>{
                  return this.$store.state.profileInitials
                })
                .then(()=>{
                  return this.$store.commit("setProfileInitialsURL")
                })
                .then(()=>{
                  return this.$store.dispatch("updateImg")
                })
              }    
            }
          }        
      } 
    
}
};

</script>
-->
<style>

</style>
