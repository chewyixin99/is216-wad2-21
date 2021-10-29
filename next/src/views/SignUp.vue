<template>

<div class="grid md:grid-cols-3">
<div class="px-8 pt-6 text-gray-700 text-lg font-bold mb-2 justify-items-center">Sign Up</div>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">
        First Name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" v-model="firstName">
    </div>
     
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
        Last Name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" v-model="lastName">
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name="email" v-model="email">
    </div>


    <div class="mb-1">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" v-model="password">
    </div>


    <div class="flex items-center justify-between">

      <div class="error" v-show="error">{{this.errorMsg}}</div>

      <button @click.prevent="signup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign Up
      </button>

      <router-link class="router-link" :to="{name: 'Login'}">
      Already have an account?</router-link>

    </div>

  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;Project Next. All rights reserved.
  </p>
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
        password: "",
        errorMsg : "",
        error: null,
    };
},

methods:{
  async signup() {
      if (
        this.email !== "" && 
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" 
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        this.$router.replace({name: "Onboarding"});
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        });
              
    }

    this.error = true;
    this.errorMsg = "Please fill out all the fields!";
    }
}
};

</script>
-->
<style>

</style>
