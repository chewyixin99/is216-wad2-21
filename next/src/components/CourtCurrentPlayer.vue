<template>
    <li>
        <div class="col-span-1 justify-items-center">
            <div v-if="profileImg">
                <img class="h-10 w-10 rounded-full object-cover" :src="profileImg">
            </div>
            <div v-else> 
                <img class="h-10 w-10 rounded-full object-cover" :src="profileInitialsURL">
            </div>
            <!-- <span class="secondary-white-title ml-3 my-auto">{{firstName}} {{lastName}}</span> -->
        </div>
        <!-- <hr> -->
    </li>
</template>

<script>
// import store from '../store/index'
// import TheProfileIcon from "./TheProfileIcon.vue"
import firebase from 'firebase/compat/app';

export default {
    name: "CourtCurrentPlayer",

    components: {

    },

    data(){

        return{

            profileImg: null,
            firstName: null,
            lastName: null,
            profileInitialsURL: null,   
        }
    },

    props: ["playerID"],
    

    created() {

        firebase
        .firestore()
        .collection("users")
        .doc(this.playerID)
        .get()
        .then((docRef) => {
            
            this.profileImg = docRef.data().profileImg
            this.firstName = docRef.data().firstName
            this.lastName = docRef.data().lastName
            this.profileInitialsURL = docRef.data().initialsURL

        })
        .then(()=>{
            console.log("Current players successfully retrieved from court");
        })

    },

}
</script>

<style>

</style>