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
              <div class="sm:space-x-4 md:space-x-0">
                <button class="bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-bold py-2 px-4 rounded w-36 mt-3" @click="toEditProfile">
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


      <!-- INSERT V-SHOW IF GROUPS.LENGTH = 0 -->

      <!-- <div v-if="groupID != []">
        <div v-for="id in compiledgroupID" :key=id class="bg-gray-800 shadow-md rounded px-8 py-6 my-3 mx-6 text-center">
          <div class="text-center secondary-white-title">
            Group Name: {{id[0]}}
          </div>
          <div class="text-center secondary-white-title">
            Note: {{id[1]}}
          </div>
          <div class="text-center secondary-grey-title">
            Unique Group Code:  
            <input :value='id[2]'>
          </div>
          <br>
          <button class="bg-red-500 hover:bg-red-700 text-gray-800 font-bold py-2 px-4 rounded" :value='id[0]' @click="deleteGroup(id[2])">
            Delete Group
          </button>
        </div>
      </div>

      <div v-else>
        <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-3 mx-6 text-center">
          <div class="text-center secondary-white-title">
            NO GROUPS YET
          </div>
        </div> -->
      <!-- </div> -->




  </div>

  </div>

</template>

<script>


import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase/firebase'
import { useRouter } from 'vue-router'
// import firebase from 'firebase/compat/app';
import db from "../firebase/firebaseInit";


export default {
  name: 'Profile',
    data(){
      return{
          // firstName: "",
          // lastName: "",
          // experience: "" ,
          // favTeam: "",
          // favPlayer: "",
          groupID: [],
          compiledgroupID: [],
          str: "",

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
      // created() {
          
      //     const auth = getAuth()
      //     const userInfo = auth.currentUser
      //     const uid = userInfo.uid
      //     console.log(uid);
      //     firebase
      //       .firestore()
      //       .collection("users")
      //       .doc(uid)
      //       .get()
      //       .then((docRef) => {
      //         this.firstName = docRef.data().firstName
      //         this.lastName = docRef.data().lastName
      //         this.experience = docRef.data().experience
      //         this.favTeam = docRef.data().favTeam
      //         this.favPlayer = docRef.data().favPlayer
      //         this.groupID = docRef.data().groupID

      //         for (let id of this.groupID){
      //           db.collection("groups").doc(id).get().then((docRef1) => {
      //             this.compiledgroupID.push([docRef1.data().groupName , 
      //               docRef1.data().Notes,
      //               id                  
      //             ])
      //             console.log(this.compiledgroupID);

      //           })

      //         }

              
      //       })
      //     },

</script>

