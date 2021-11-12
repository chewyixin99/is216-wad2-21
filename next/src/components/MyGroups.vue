<template>
    

    <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-3 mx-6">
        <div class="grid grid-cols-5 gap-4">

            <div class="col-span-5 md:col-span-1 text-center">
                <div class="profile-image flex justify-center items-center">
                    <!-- <div v-if="groupImg">
                        <AvatarInputGroup :value="groupImg" />
                    </div>
                    <div v-else>
                        <AvatarInputGroup :value="groupImgDefault"/>
                    </div> -->
                    
                    
                    <img src="https://t3.ftcdn.net/jpg/04/55/75/46/240_F_455754611_8eowWGUS88rIH74lyLaEgAHim7XPc2Os.jpg" alt="">
                </div>

                <div class="space-x-3 md:space-x-0">
                    <the-button class="bg-yellow-500 hover:bg-yellow-700 text-white mt-3" buttonType="form-sm" @click="$emit('add',this.info)">
                        ADD MEMBER
                    </the-button>
                    <the-button class="bg-red-500 hover:bg-red-700 text-white mt-3" buttonType="form-sm" @click="$emit('remove',{id:this.info,name:groupName})">
                    LEAVE GROUP
                    </the-button>
                </div>

            </div>

            <div class="col-span-5 md:col-span-4">

                <div class="flex flex-wrap  justify-between">
                    <!-- <span class="secondary-gold-title">{{groupName}}</span> -->
                    <!-- <span class="rounded-full bg-gray-700 py-2 px-5 font-bold text-white text-sm">{{memberID.length}} P</span> -->
                    <span class="secondary-gold-title">{{groupName.toUpperCase()}}</span>
                    <span class="rounded-full bg-gray-700 py-2 px-5 font-bold text-white text-sm">{{memberID.length}} P</span>

                </div>
                <div class="text-center md:text-left">
                    <!-- <span class="secondary-white-title">{{groupExp}}</span> -->
                    <span class="secondary-white-title">{{groupExp.toUpperCase()}}</span>
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
                <span class="secondary-white-title">TEAM NOTEBOARD:</span>
                <textarea v-model="groupMsg"></textarea>
                <the-button class="bg-yellow-500 hover:bg-yellow-700 text-white mt-3" buttonType="form-sm" @click="updateNoteboard">
                        UPDATE NOTEBOARD
                </the-button>
    </div> 

</template>


<script>



import 'firebase/compat/firestore';
import Members from "./Members.vue"
import firebase from 'firebase/compat/app';
import TheButton from "./TheButton.vue"
// import AvatarInputGroup from "./AvatarInputGroup.vue"

export default {

    name: "MyGroups",
    props: ["info"],

    components: {

        Members,
        TheButton, 
        // AvatarInputGroup

    },

    data(){
        return{

            groupName: "",
            groupExp: "",
            memberID: "",
            newMemberID: "",
            groupMsg: null,
            groupImg: null,
            groupImgDefault: null,

        }
    },

    methods:{

        updateNoteboard(){

            firebase
            .firestore()
            .collection("groups")
            .doc(this.info)
            .update({

                groupMsg: this.groupMsg

            })
            .then(()=>{
                console.log("Group Message Update Successful");
            })
            
        }

        
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
            this.groupMsg = docRef.data().groupMsg
            // this.groupImg = docRef.data().groupImg
            this.groupImgDefault = docRef.data().groupImgDefault

        })
        .then(()=>{        
            console.log(this.groupImgDefault);
            console.log(this.groupImg);
        })


        },

    
};



</script>