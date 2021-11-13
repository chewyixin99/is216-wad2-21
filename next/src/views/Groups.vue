<template>

  <div>
    
    <div class="container max-w-5xl mx-auto">

      <!-- GROUPS -->
        <div class="flex flex-wrap justify-between mx-6 mt-6">

          <div class="secondary-gold-title">
            MY GROUPS
          </div>

          
          <!-- <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="toCreateGroup">
            CREATE GROUP
          </button> -->
          <the-button :onClick="toCreateGroup" class="bg-green-500 hover:bg-green-700 text-white" buttonType="form-md">
            CREATE GROUP
          </the-button>

        </div>

        <div v-if="groupID.length == 0">
          <div class="bg-gray-800 shadow-md rounded px-8 py-10 my-3 mx-6 text-white text-center">
            NO GROUP YET
          </div>
        </div>

        <div v-else v-for="info in groupID" :key="info">
            <MyGroups :info = info @add="addMembers($event)" @remove="removeMembers($event)"/>

        </div>



  </div>
  </div>
</template>

<script>

import MyGroups from "../components/MyGroups.vue"
import TheButton from "../components/TheButton.vue"
// import firebase from 'firebase/compat/app';

export default {
    name: 'Groups',
    data(){
      return{

        addMemberID: null,

      }
      
    },
    // emits: ['add'],
    components: {

        // TheProfileIcon,
        MyGroups, 
        TheButton,

    },
    methods: {
              
        toCreateGroup(){

          this.$router.replace({name: "CreateGroup"});
          
        },

        addMembers(groupID){
        
          this.addMemberID = prompt("Input UID of member to add")
          if (this.addMemberID != null){
            this.$store.commit("inputCurrentMember", this.addMemberID)
            this.$store.commit("inputCurrentGroup", groupID)
            this.$store.dispatch("addNewMember")
            .then(()=>{
              location.reload()
            })
          }


        },
        removeMembers(obj){
        
          let input = confirm("Are you sure you want to leave '" + obj.name + "'")
          if (input){
            this.$store.commit("inputCurrentMember", this.$store.state.profileID)
            this.$store.commit("inputCurrentGroup", obj.id)
            this.$store.dispatch("removeMember")
            .then(()=>{
              location.reload();
            });
          }


        }

    },
      
    computed:{

        groupID:{

          get(){
            
            console.log("those");
            return this.$store.state.profileGroupID

          }
        },

    },
  
    created(){

      
      this.$store.dispatch("getGroupID")

  
      
    }
}

</script>