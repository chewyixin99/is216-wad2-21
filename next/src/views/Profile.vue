<template>
  <TheNavigationBar/>
  <div class="profile">
    <h1 class="mt-7">This is a profile page</h1>
  </div>

  <div>
      <h1>Welcome {{ user?.email }}!</h1>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="signOutUser">Sign Out</button>
  </div>


</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase/firebase'
import { useRouter } from 'vue-router'


export default {
  name: 'Home',
  components: {
  },
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
    }, 
}
</script>