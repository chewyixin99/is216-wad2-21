<template>
  <div>

  <div class="container max-w-5xl mx-auto">
      <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-6 mx-6">
        <div class="grid grid-cols-4 md:space-x-2">
          <!-- PROFILE IMAGE AND EDIT BUTTON -->
          <div class="col-span-4 md:col-span-1">
            <div class="rounded-full text-center">
              <div class="profile-image flex justify-center items-center">
                <img v-bind:src="profilePicture" alt="">
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

      <div class="bg-gray-800 rounded mx-6 p-6 text-center">
        <activity-chart></activity-chart>
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
// import db from "../firebase/firebaseInit";
// import firebase from 'firebase/compat/app';
import Group from "../components/Group.vue"
import ActivityChart from '../components/ActivityChart.vue'

export default {
  name: 'PublicUser',
  components: {
      Group,
      ActivityChart,
  },
      data(){
        return{
            groupID: [],
            compiledgroupID: [],
            str: "",

        }
      },

      // created() {

      // },
    
      methods:{

       
      },
      
      // GET DOCUMENT INFORMATION
      computed: {

        firstName: {
          get() {
            return this.$store.state.selectedProfile.firstName
            },
        },
        
        lastName: {
          get() {
            return this.$store.state.selectedProfile.lastName
            },
        },

        experience: {
          get() {
            return this.$store.state.selectedProfile.experience
            },
        },

        favPlayer: {
          get() {
            return this.$store.state.selectedProfile.favPlayer
            },
        },
        
        favTeam: {
          get() {
            return this.$store.state.selectedProfile.favTeam
            },
        },

        email: {
          get() {
            return this.$store.state.selectedProfile.email
          }
        },

        profilePicture: {
          get() {
            const img = this.$store.state.selectedProfile.profileImg
            if (
              this.$store.state.selectedProfile.profileImg == "" ||
              (img) == null ||
              (img) == 'undefined'
            ) {
              return this.$store.state.defaultProfileImg
            }
            return this.$store.state.selectedProfile.profileImg
          }
        }

    }
}

</script>

