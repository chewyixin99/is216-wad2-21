<template>

  <div>
    
    <div class="container max-w-5xl mx-auto">

        <!-- GROUPS -->
        <div class="flex flex-wrap justify-between mx-6 mt-6">

          <div class="secondary-gold-title">
            MY GROUPS
          </div>

          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="toCreateGroup">
              CREATE GROUP
          </button>

        </div>
    </div>

    <div v-for="info in groupID" :key="info">
        <MyGroups :info = info @add="addMembers($event)" @remove="removeMembers($event)"/>

    </div>



  </div>

</template>

<script>

import MyGroups from "../components/MyGroups.vue"
// import firebase from 'firebase/compat/app';

export default {
    name: 'Groups',
    data(){
      return{

        addMemberID: null,

      }
      
    },
    emits: ['add'],
    components: {

        // TheProfileIcon,
        MyGroups, 

    },
    methods: {
              
        toCreateGroup(){

          this.$router.replace({name: "CreateGroup"});
          
        },

        addMembers(groupID){
        
          this.addMemberID = prompt("Input UID of member to add")
          this.$store.commit("inputCurrentMember", this.addMemberID)
          this.$store.commit("inputCurrentGroup", groupID)
          this.$store.dispatch("addNewMember");
        },
        removeMembers(obj){
        
          let input = confirm("Are you sure you want to leave '" + obj.name + "'")
          if (input){
            this.$store.commit("inputCurrentMember", this.$store.state.profileID)
            this.$store.commit("inputCurrentGroup", obj.id)
            this.$store.dispatch("removeMember");
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



<!--
// import { getAuth, signOut } from 'firebase/auth'
// import { useAuthState } from '../firebase/firebase'
// import { useRouter } from 'vue-router'
// import firebase from 'firebase/compat/app';
// import TheProfileIcon from "../components/TheProfileIcon.vue"

      // console.log("that");
      // this.test()
      // console.log("test2");
      // this.eww()
      // this.$store.dispatch("getGroupInfo").then(()=>{
      //   this.groupInfo = this.$store.state.groupInfo
      // })


        // async test() {
        //   this.$store.dispatch("getGroupInfo").then(()=>{
        //     console.log("group info retrieved");
        //     this.groupInfo = this.$store.state.groupInfo
        //     console.log(this.groupInfo)
        //   })

        // },

        // async eww(){
        //   console.log(this.groupID);
        //   const compilation1 = []
        //   for (let id in this.groupID){
        //       console.log(id);
        //       const dataBase2 =  await db.collection('groups').doc(id);
        //       const dbResults2 =  await dataBase2.get();
        //       compilation1.push(dbResults2) 
        //   }
        //   this.groupInfo = compilation1
        //   console.log("baaaaaaa");
        //   console.log(this.groupInfo);
        //   console.log("teeeeeeeee");
        // }
      INSERT V-SHOW IF GROUPS.LENGTH = 0 
      <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-3 mx-6 text-center">
        <div class="text-center secondary-white-title">
          NO GROUPS YET
        </div>
      </div> 
      
          <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-3 mx-6">
            <div class="grid grid-cols-4">
                GROUP PROFILE 
                <div class="col-span-4 md:col-span-1 text-center">
                    <div class="profile-image flex justify-center items-center">
                        <img src="https://t3.ftcdn.net/jpg/04/55/75/46/240_F_455754611_8eowWGUS88rIH74lyLaEgAHim7XPc2Os.jpg" alt="">
                    </div>
                    DELETE BUTTON 
                    <div class="sm:space-x-4 md:space-x-0">
                        <button class="bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-bold py-2 px-4 rounded w-36 mt-3" @click="addMembers">
                            ADD MEMBER
                        </button>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold font-bold py-2 px-4 rounded w-36 my-3" @click="leaveGroup">
                            LEAVE GROUP
                        </button>
                    </div>

                </div>
                GROUP MEMBERS 
                <div class="col-span-4 md:col-span-3">
                    GROUP NAME 
                    <div class="flex flex-wrap justify-between">
                        <span class="secondary-gold-title">SUPPORT SYSTEM</span>
                        <span class="secondary-white-title">RECREATIONAL</span>
                    </div>
                    V-FOR GROUP MEMBERS 
                    <div class="grid grid-cols-8 lg:grid-cols-12 gap-4">
                        <the-profile-icon v-for="(a_player, index) in this.currentPlayers" :initials="a_player.initials" :key="index"
                        class="font-bold" />
                    </div>
                </div>
        </div>
    </div>

    data(){
      return{
          currentPlayers: [
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
          ]
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

        // ROUTE TO CREATE GROUP
        toCreateGroup(){
          this.$router.replace({name: "CreateGroup"});
        },
        addMembers(){
          var member = prompt("Enter email")
          return member
        },
        deleteGroup(){
          alert ("Are you sure you want to delete this group?")
        },

      },
-->