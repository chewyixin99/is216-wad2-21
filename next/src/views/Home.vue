<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase/firebase'
import { useRouter } from 'vue-router'


export default {
  name: 'Home',
  setup() {
    const { user } = useAuthState()
    const auth = getAuth()
    const router = useRouter()

    const signOutUser = async () => {
      try {
        await signOut(auth)
        router.push('/login')
      } catch (e) {
        alert(e.message)
      }
    }
    return { user, signOutUser }
    }
  }

</script>

<template>

    <!-- <h1 class="bg-gray-700">This is a Home page</h1> -->
    <h1>Welcome {{ user?.email }}!</h1>
    <!-- The code below shows error but it should still work -->
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="signOutUser">Sign Out</button>
</template>

<style>

</style>