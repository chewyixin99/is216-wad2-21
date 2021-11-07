<template>
  <div>

  <div class="container max-w-5xl mx-auto">
      <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-6 mx-6">
        <div class="grid grid-cols-4 md:space-x-2">
          <!-- PROFILE IMAGE AND EDIT BUTTON -->
          <div class="col-span-4 md:col-span-1">
            <div class="rounded-full text-center">
              <div class="profile-image flex justify-center items-center">
                <img src="https://t3.ftcdn.net/jpg/04/55/75/46/240_F_455754611_8eowWGUS88rIH74lyLaEgAHim7XPc2Os.jpg" alt="">
              </div>
            </div>
          </div>

          <!-- PROFILE DETAILS -->
          <div class="col-span-4 md:col-span-3">
            <div class="primary-gold-title mb-4">
              {{firstName.toUpperCase()}} {{lastName.toUpperCase()}}
            </div>
            <div class="secondary-white-title mb-4 flex flex-wrap justify-between">
              <span style="color: #FEB842">EXPERIENCE</span>
              <span>{{experience.toUpperCase()}}</span>
            </div>
            <!-- <hr> -->
            <div class="secondary-white-title mb-4 flex flex-wrap justify-between">
              <span style="color: #FEB842">FAVOURITE PLAYER</span>
              <span>{{favPlayer.toUpperCase()}}</span>
            </div>
            <!-- <hr> -->
            <div class="secondary-white-title mb-4 flex flex-wrap justify-between">
              <span style="color: #FEB842">FAVOURITE TEAM</span>
              <span>{{favTeam.toUpperCase()}}</span>
            </div>
            
          </div>

        </div>
      </div>

      <div class="bg-white border rounded h-60 mx-6 mb-6 text-center">
        This is for activity level
      </div>


      <div>
          <group>
          </group>
      </div>



  </div>

  </div>

</template>

<script>


// import { getAuth, signOut } from 'firebase/auth'
// import { useAuthState } from '../firebase/firebase'
// import { useRouter } from 'vue-router'
// import firebase from 'firebase/compat/app';
// import db from "../firebase/firebaseInit";
import Group from "../components/Group.vue"

export default {
  name: 'PublicUser',
  components: {
      Group
  },
    data(){
      return{
          groupID: [],
          compiledgroupID: [],
          str: "",

      }
    },
    
      methods:{

       
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

        favPlayer: {

          get() {
            return this.$store.state.profileFavPlayer
            },

        },
        
        favTeam: {

          get() {
            return this.$store.state.profileFavTeam
            },

        },

    }
}

</script>

