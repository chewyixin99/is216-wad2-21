<template>
<div class="w-full max-w-xs">
  <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name ="email" id="email" type="text">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name ="password" id="password" type="password">
    </div>
    <div class="flex items-center justify-between">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
        Sign In
      </button>

      <div class="error" v-show="error">{{this.errorMsg}}</div>

      <router-link :to="{name: 'SignUp'}">
      Need An Account?</router-link>

      <router-link class="forgot-password" :to="{name: 'ForgotPassword'}">
      Forgot Password?</router-link>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;Project Next. All rights reserved.
  </p>
</div>
</template>


<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const auth = getAuth()
    const router = useRouter()

    const handleSubmit = async e => {
      const { email, password } = e.target.elements
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        router.push('/')
      } catch (e) {
        alert(e.message)
      }
    }

    return { handleSubmit }
  }
}
</script>


<!--

This code is one of my test codes - but it gave me problems *********

<script>
import firebase from 'firebase/compat/app';

export default {
    name: "Login",

    data() {
        return {
            email: "",
            password: "",
            error: null,
            errorMsg: "",
        };
     },
    methods:{
      signIn() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{
          this.$router.push({name: "Home"});
          this.error = false;
          this.errorMsg = "";
          console.log(firebase.auth().currentUser.uid);
        }).catch(err=>{
          this.error = true;
          this.errorMsg = err.message;
        })
      }
     }
};
</script>

-->