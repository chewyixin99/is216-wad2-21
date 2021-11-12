<template>

    <li>
        <div class="flex flex-wrap">
            <div v-if="profileImg">
                <img class="h-10 w-10 rounded-full object-cover" :src="profileImg">
            </div>
            <div v-else> 
                <img class="h-10 w-10 rounded-full object-cover" :src="profileInitialsURL">
            </div>
            <span class="secondary-white-title ml-3 my-auto">{{firstName}} {{lastName}}</span>
        </div>
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
        }

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
        })
        .then(()=>{
            console.log(this.profileImg);
            console.log(this.profileInitialsURL);
        })


        },
})
</script>
