<template>

    <li>
        <span class="secondary-white-title">{{firstName}}</span>
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

            
        })


        },
})
</script>
