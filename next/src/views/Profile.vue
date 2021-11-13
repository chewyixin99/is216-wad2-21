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
                <the-button :onClick="signOutUser" class="bg-red-500 hover:bg-red-700 text-white mt-3" buttonType="form-sm">
                  SIGN OUT
                </the-button>
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
              <span style="color: #FEB842">FAVOURITE PLAYERS</span>
              <div>
                <span>{{favPlayer1.toUpperCase()}}</span>
                <span v-if="favPlayer2"> , {{favPlayer2.toUpperCase()}}</span>
              </div>

            </div>

            <div class="secondary-white-title mb-4 flex flex-wrap justify-between">
              <span style="color: #FEB842">FAVOURITE TEAMS</span>
              <div>
                <span>{{favTeam1.toUpperCase()}}</span>
                <span v-if="favTeam2"> , {{favTeam2.toUpperCase()}}</span>
              </div>
            </div>

            
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
// import firebase from 'firebase/compat/app';
import db from "../firebase/firebaseInit";
import TheButton from "../components/TheButton.vue"
import ActivityChart from "../components/ActivityChart.vue"
// import AvatarInput from '../components/AvatarInput.vue';

export default {
  name: 'Profile',
  components: {
    TheButton,
    ActivityChart,

  },
    data(){

      return{

          groupID: [],

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
        return { user, signOutUser}
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

        deleteGroup(id){
            
          db.collection("users").doc(id).get().then((docRef1) => {
              const groupIDObj = docRef1.data().groupID
              const compilation = [];
              for (var i = 0; i < groupIDObj.length; i++){
                  compilation.push(groupIDObj[i])
              }
              compilation.push(id)
              db.collection("users").doc(id).update({
                  groupID: compilation
              });
          });
           

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

        favPlayer1: {

          get() {
            return this.$store.state.profileFavPlayer1
            },

        },

        favPlayer2: {

          get() {
            return this.$store.state.profileFavPlayer2
            },

        },

        
        favTeam: {

          get() {
            return this.$store.state.profileFavTeam
            },

        },

        favTeam1: {

          get() {
            return this.$store.state.profileFavTeam1
            },

        },

        favTeam2: {

          get() {
            return this.$store.state.profileFavTeam2
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

