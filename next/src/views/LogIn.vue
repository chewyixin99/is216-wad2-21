<template>
<div class="container max-w-md mx-auto">
  <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 m-6">
    <form @submit.prevent="handleSubmit">
      <!-- LOGIN DETAILS -->
      <div class="mb-4">
        <label class="block text-white text-sm font-bold mb-2" for="email">
          EMAIL
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name ="email" id="email" type="text"  placeholder="Email">
      </div>
      <div class="mb-6">
        <label class="block text-white text-sm font-bold mb-2" for="password">
          PASSWORD
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" name ="password" id="password"  type="password" placeholder="Password">
        <div class="text-gray-400 text-right">
          <router-link class="forgot-password" :to="{name: 'ForgotPassword'}">
          Forgot Password?</router-link>
        </div>
      </div>
      

      <!-- SIGN IN BUTTON -->
      <div class="items-center justify-between text-center mb-4">
        <button type="submit" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full" >
          LOG IN
        </button>

        <div class="error" v-show="error">{{this.errorMsg}}</div>
      </div>

      <!-- SIGN UP LINK -->
      <div class="text-center text-white">
        <router-link :to="{name: 'SignUp'}">
        Don't have an account? <span class="text-yellow-500">Sign up</span></router-link>
      </div>

    </form>
  </div>
</div>
</template>


<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'LogIn',
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

