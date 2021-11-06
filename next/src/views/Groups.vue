<template>
  <div>

  <div class="container max-w-5xl mx-auto">

      <!-- GROUPS -->
      <div class="flex flex-wrap justify-between mx-6 mt-6">
        <div class="secondary-gold-title">
          MY GROUPS
        </div>
        <div>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="toCreateGroup">
            CREATE GROUP
          </button>
        </div>
      </div>

      <!-- INSERT V-SHOW IF GROUPS.LENGTH = 0 -->
      <!-- <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-3 mx-6 text-center">
        <div class="text-center secondary-white-title">
          NO GROUPS YET
        </div>
      </div> -->

      <!-- INSERT V-SHOW IF GROUPS.LENGTH > 0 -->
      <div>
        <!-- V-FOR GROUPS -->
        <group>
        </group>

        <group>
        </group>

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
// import TheProfileIcon from "../components/TheProfileIcon.vue"
import Group from "../components/Group.vue"


export default {
    name: 'Groups',
    components: {
        // TheProfileIcon,
        Group,
    },
    props: {
    },
    data(){
      return{
      }
    },
    
    methods:{

      // ROUTE TO CREATE GROUP
      toCreateGroup(){
        this.$router.replace({name: "CreateGroup"});
      },
      // addMembers(){
      //   var member = prompt("Enter email")
      //   return member
      // },
      // deleteGroup(){
      //   alert ("Are you sure you want to delete this group?")
      // },

    },
      

}

</script>

