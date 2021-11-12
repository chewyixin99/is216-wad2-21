<template>

    <li>
        <a href="/publicuser"><div class="flex flex-wrap" :onClick="toPublicUser">
            <div v-if="profileImg">
                <img class="h-10 w-10 rounded-full object-cover cursor-pointer" :src="profileImg">
            </div>
            <div v-else> 
                <img class="h-10 w-10 rounded-full object-cover cursor-pointer" :src="profileInitialsURL">
            </div>
            <span class="secondary-white-title ml-3 my-auto hover:text-yellow-500 cursor-pointer">{{firstName}} {{lastName}}</span>
        </div></a>
        <!-- <hr> -->
    </li>

</template>

<script>

import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

export default ({
    name: "Members",
    props: ["member1"],

    data(){

        return{
            firstName: null,
            lastName: null,
            experience: null,
            profileImg: null,
            profileInitialsURL: null,
            memberObj: null,
        }

    },

    methods:{
        toPublicUser(){
        //   this.$router.replace({name: "PublicUser"});
          this.$store.commit('updateSelectedProfile', this.memberObj)
          this.$store.dispatch('populatePublicUserGroupDetails', this.memberObj.groupID)
        },
    },

    created() {
        firebase
        .firestore()
        .collection("users")
        .doc(this.member1)
        .get()
        .then((docRef) => {
            this.firstName = docRef.data().firstName
            this.lastName = docRef.data().lastName
            this.experience = docRef.data().experience
            this.profileImg = docRef.data().profileImg
            this.profileInitialsURL = docRef.data().initialsURL
            // console.log(docRef.data().firstName)
            console.log(docRef.data().email)
            // console.log(docRef.data().groupID)
            console.log(this.member1)
            this.memberObj = {
                firstName: docRef.data().firstName,
                lastName: docRef.data().lastName,
                experience: docRef.data().experience,
                email: docRef.data().email,
                favPlayer: docRef.data().favPlayer,
                favTeam: docRef.data().favTeam,
                profileImg: docRef.data().profileImg,
                groupID: docRef.data().groupID,
            }
        })
        .then(()=>{
            // console.log(this.profileImg);
            // console.log(this.profileInitialsURL);
        }).catch(e => console.log(`members.vue error: ${e}`))


        },
})
</script>
