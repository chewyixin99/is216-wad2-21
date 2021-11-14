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
            <MyGroups :info = info @add="addMembers($event)" @remove="removeMembers($event)" :key="$store.state.reloadKeys"/>

        </div>

        <ModalAddMembers v-if="modalActive1" @closeModal="closeModal" @prompt="prompt($event)" :modalMessage="modalMessage" :flag="flag1"/>
        <ModalConfirmation v-if="modalActive2" @confirm="confirm" :modalMessage="modalMessage" :flag="flag2"/>


  </div>
  </div>
</template>

<script>

import MyGroups from "../components/MyGroups.vue"
import TheButton from "../components/TheButton.vue"
import ModalAddMembers from "../components/modalAddMembers.vue"
import ModalConfirmation from "../components/modalConfirmation.vue"


export default {
    name: 'Groups',

    data(){

      return{

        modalActive1: false,
        modalActive2: false,
        modalMessage: "",
        modalType: '',
        flag1: false,
        flag2: false,
        input: "",
        retrievedGroupID: "",
        retrievedGroupObj: null,

      }
      
    },
    // emits: ['add'],
    components: {

        // TheProfileIcon,
        MyGroups, 
        TheButton,
        ModalAddMembers,
        ModalConfirmation

    },
    methods: {

        forceRerender() {
            this.$store.commit("forceRerender")
        },
              
        toCreateGroup(){

          this.$router.replace({name: "CreateGroup"});
          
        },

        addMembers(groupID){
        
          this.retrievedGroupID = groupID
          this.modalActive1 = true;
          this.flag1 = true;

        },

        removeMembers(obj){

          this.retrievedGroupObj = obj
          this.modalActive2 = true;
          this.flag2 = true;
          this.modalMessage = "Are you sure you want to leave '" + obj.name + "'";

        },

        prompt(input){

          this.input = input;
          this.$store.commit("inputCurrentMember", this.input)
          this.$store.commit("inputCurrentGroup", this.retrievedGroupID)
          this.$store.dispatch("addNewMember")
            .then(()=>{
                this.forceRerender()
            })

        },

        closeModal(){

            this.modalActive1 = !this.modalActive1;

        },

        confirm(reply){

          if (reply){
            
            this.modalActive2 = !this.modalActive2;
            this.$store.commit("inputCurrentMember", this.$store.state.profileID)
            this.$store.commit("inputCurrentGroup", this.retrievedGroupObj.id)
            this.$store.dispatch("removeMember")
            .then(()=>{
                  location.reload()
            })

          }

          else{

            this.modalActive2 = !this.modalActive2;

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