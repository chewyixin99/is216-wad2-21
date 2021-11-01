<template>
  <div>
    <div class="profile">
      <h1 class="mt-7">This is a profile page</h1>
    </div>

  <div class="container max-w-3xl mx-auto">
      <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-6 mx-6">
        <div class="grid grid-cols-4">

          <!-- PROFILE IMAGE AND EDIT BUTTON -->
          <div class="col-span-4 md:col-span-1">
            <div class="rounded-full text-center">
              <div class="player-image flex justify-center items-center">
                <img src="https://t3.ftcdn.net/jpg/04/55/75/46/240_F_455754611_8eowWGUS88rIH74lyLaEgAHim7XPc2Os.jpg" alt="">
              </div>
              <div class="space-x-4">
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
            <div class="primary-title">
              FULL NAME
            </div>
            <div class="secondary-title">
              EXPERIENCE
            </div>
            <div class="secondary-title">
              FAVOURITE PLAYER
            </div>
            <div class="secondary-title">
              FAVOURITE TEAM
            </div>
          </div>
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


<style scoped>

.primary-title {
  color: #FEb842;
  font-size: 36px;
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 5px;
  text-shadow: 2px 1px black;
}

.secondary-title {
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 5px;
  text-shadow: 2px 1px black;
}

.player-image img{
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: 1px solid #FEb842 ;
  margin: 10px 10px 5px 0px;
  box-shadow: 1px 2px;
}

</style>