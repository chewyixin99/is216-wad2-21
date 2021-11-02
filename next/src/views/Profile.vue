<template>
  <div>

  <div class="container max-w-3xl mx-auto">
      <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-6 mx-6">
        <div class="grid grid-cols-4 md:space-x-2">

          <!-- PROFILE IMAGE AND EDIT BUTTON -->
          <div class="col-span-4 md:col-span-1">
            <div class="rounded-full text-center">
              <div class="profile-image flex justify-center items-center">
                <img src="https://t3.ftcdn.net/jpg/04/55/75/46/240_F_455754611_8eowWGUS88rIH74lyLaEgAHim7XPc2Os.jpg" alt="">
              </div>
              <div class="sm:space-x-4 md:space-x-0">
                <button class="bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-bold py-2 px-4 rounded w-36 mt-3" @click="toOnboarding">
                    EDIT PROFILE
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold font-bold py-2 px-4 rounded w-36 my-3" @click="signOutUser">
                    SIGN OUT
                </button>
              </div>
            </div>
          </div>

          <!-- PROFILE DETAILS -->
          <div class="col-span-4 md:col-span-3">
            <div class="primary-gold-title">
              FULL NAME
            </div>
            <div class="secondary-white-title">
              EXPERIENCE
            </div>
            <div class="secondary-white-title">
              FAVOURITE PLAYER
            </div>
            <div class="secondary-white-title">
              FAVOURITE TEAM
            </div>
          </div>
          </div>
      </div>

      <div class="secondary-gold-title px-8">
        GROUPS
      </div>

      <!-- INSERT V-SHOW IF GROUPS.LENGTH = 0 -->
      <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-3 mx-6 text-center">
        <div class="text-center secondary-white-title">
          NO GROUPS YET
        </div>
      </div>

  </div>

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
    methods:{
      toOnboarding(){
        this.$router.replace({name: "Onboarding"});
      }
    }
}
</script>