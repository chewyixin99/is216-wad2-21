<template>
    

    <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-3 mx-6">
        <div class="grid grid-cols-4 gap-4">

            <div class="col-span-4 md:col-span-1 text-center">
                <div class="profile-image flex justify-center items-center">
                    <img src="https://t3.ftcdn.net/jpg/04/55/75/46/240_F_455754611_8eowWGUS88rIH74lyLaEgAHim7XPc2Os.jpg" alt="">
                </div>

                <div class="sm:space-x-4 md:space-x-0">
                    <button class="bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-bold py-2 px-4 rounded w-36 mt-3" @click="$emit('add',this.info)">
                        ADD MEMBER
                    </button>
                </div>
                <div>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold font-bold py-2 px-4 rounded w-36 mt-3" @click="$emit('remove',{id:this.info,name:groupName})">
                    LEAVE GROUP
                    </button>
                </div>

            </div>

            <div class="col-span-4 md:col-span-3">

                <div class="flex flex-wrap justify-between">
                    <span class="secondary-gold-title">{{groupName}}</span>
                    <span class="secondary-white-title">{{groupExp}}</span>
                </div>

                <div class="flex flex-wrap justify-between my-6">
                    <ol>
                        <Members :member1 = member v-for="member in memberID" :key="member"/>                        
                    </ol>
                </div>

                <!-- <div class="grid grid-cols-8 lg:grid-cols-12 gap-4">
                    <the-profile-icon v-for="(a_player, index) in this.currentPlayers" :initials="a_player.initials" :key="index"
                    class="font-bold" />
                </div> -->
            </div>



        </div>

    </div> 

</template>


<script>



import 'firebase/compat/firestore';
import Members from "./Members.vue"
import firebase from 'firebase/compat/app';


export default {

    name: "MyGroups",
    props: ["info"],

    components: {

        Members, 


    },
    data(){
        return{
            groupName: null,
            groupExp: null,
            memberID: null,
            newMemberID: null,
        }
    },
    method:{


    },

    created() {


        firebase
        .firestore()
        .collection("groups")
        .doc(this.info)
        .get()
        .then((docRef) => {

            this.groupName = docRef.data().groupName
            this.groupExp = docRef.data().groupExp
            this.memberID = docRef.data().memberID

        })

        },

    
};



</script>