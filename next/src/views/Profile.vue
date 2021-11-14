<template>

  <div>
  
  <div class="container max-w-5xl mx-auto">
      <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-6 mx-6">
        <div class="grid grid-cols-5 gap-4">
          <!-- PROFILE IMAGE AND EDIT BUTTON -->
          <div class="col-span-5 md:col-span-1">
            <div class="rounded-full text-center">
              <div class="profile-image flex justify-center items-center ">
                <!-- <img :src="profileImg"> -->
                <img class="h-24 rounded-full object-cover" v-if="profileImg" :src="profileImg">
                <img class="h-24 rounded-full object-cover" v-else :src="profileInitialsURL">
                <!-- <avatar-input v-model="avatar" :default-src= profileInitialsURL /> -->
              </div>
              <div class="space-x-3 md:space-x-0">
                <!-- <button class="bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-bold py-2 px-4 rounded w-36 mt-3" @click="toEditProfile">
                    EDIT PROFILE
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold font-bold py-2 px-4 rounded w-36 my-3" @click="signOutUser">
                    SIGN OUT
                </button> -->
                <the-button :onClick="toEditProfile" class="bg-yellow-500 hover:bg-yellow-700 text-white mt-3" buttonType="form-sm">
                  EDIT PROFILE
                </the-button>
                <span v-on:click="resetState()">
                  <the-button :onClick="signOutUser" class="bg-red-500 hover:bg-red-700 text-white mt-3" buttonType="form-sm">
                    SIGN OUT
                  </the-button>
                </span>
              </div>
            </div>
          </div>


          <div class="col-span-5 md:col-span-4">
            <div class="primary-gold-title mb-4 text-center md:text-left">
              {{firstName.toUpperCase()}} {{lastName.toUpperCase()}}
            </div>
            <div class="secondary-white-title mb-4 flex flex-wrap justify-between">
              <span style="color: #FEB842">EXPERIENCE</span>
              <span>{{experience.toUpperCase()}}</span>
            </div>

            <div class="secondary-white-title mb-4 flex flex-wrap justify-between">
              <span style="color: #FEB842">FAVOURITE PLAYER</span>
              <div>
                <span>{{favPlayer.toUpperCase()}}</span>
              </div>

            </div>

            <div class="secondary-white-title mb-4 flex flex-wrap justify-between">
              <span style="color: #FEB842">FAVOURITE TEAM</span>
              <div>
                <span>{{favTeam.toUpperCase()}}</span>
              </div>
            </div>

            <div class="secondary-white-title mb-4 flex flex-wrap justify-between">
              <div style="color: #FEB842" class="secondary-white-title">USER ID: </div>
              <div>
                <span>{{profileID}}</span>
                <button class="align-bottom ml-2" @click="copyText"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" 
                stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button>
              </div>
            </div>

            <modal-notify v-if="modalActive" @closeModal="closeModal" :modalMessage="modalMessage" />
            
          </div>

        </div>
      </div>

      <div class="bg-gray-800 rounded mx-6 mb-6 p-3 text-center">
        <activity-chart></activity-chart>
      </div>

  </div>

  </div>

</template>

<script>


import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase/firebase'
import { useRouter } from 'vue-router'
import TheButton from "../components/TheButton.vue"
import ActivityChart from "../components/ActivityChart.vue"
import ModalNotify from '../components/modalNotify.vue'


export default {
  name: 'Profile',
  components: {
    TheButton,
    ActivityChart,
    ModalNotify,

  },
    data(){

      return{

          groupID: [],
          profileID: this.$store.state.profileID,
          favPlayer: this.$store.state.profileFavPlayer,
          favTeam: this.$store.state.profileFavTeam,
          modalActive: false,
          modalMessage: "User ID copied to clipboard!",

      }

    },
    setup() {

      const { user } = useAuthState()
      const auth = getAuth()
      const router = useRouter()

      // SIGN OUT

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
        
        // ROUTE TO EDIT PROFILE
        toEditProfile(){
          this.$router.replace({name: "EditProfile"});
        },

        // ROUTE TO CREATE GROUP
        toCreateGroup(){
          this.$router.replace({name: "CreateGroup"});
        },

        copyText(){
          navigator.clipboard.writeText(this.profileID)
          .then(()=>{
          this.modalActive = true;


            })
        },

        resetState() {
          this.$store.commit('resetState')
        },

        closeModal(){

            this.modalActive = !this.modalActive;

        },

      },

      
      // GET DOCUMENT INFORMATION
      computed: {

        firstName: {

          get() {
            return this.$store.state.profileFirstName
            },
            
        },
        
        lastName: {

          get() {
            return this.$store.state.profileLastName
            },

        },

        experience: {

          get() {
            return this.$store.state.profileExperience
            },

        },

        profileInitialsURL: {

          get() {
            return this.$store.state.profileInitialsURL
            },

        },

        profileImg: {

          get() {
            console.log(this.firstName);
            console.log(this.$store.state.profileID);
            console.log("uid");
            console.log(this.$store.state.profileImg);
            return this.$store.state.profileImg
            
            },

        },


    },
}
          
</script>

