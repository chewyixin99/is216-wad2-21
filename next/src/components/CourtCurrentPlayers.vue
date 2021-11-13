<template>
    <div class="m-4">
        <ol class="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-4">

            <CourtCurrentPlayer :playerID = currentPlayer v-for="currentPlayer in currentPlayers" :key="currentPlayer" />

        </ol>
    </div>
</template>

<script>
// import store from '../store/index'
// import TheProfileIcon from "./TheProfileIcon.vue"
import CourtCurrentPlayer from "./CourtCurrentPlayer.vue"
import firebase from 'firebase/compat/app';

export default {
    name: "CourtCurrentPlayers",

    components: {
        // TheProfileIcon
        CourtCurrentPlayer
    },

    props: ["courtID"],
    
    // mounted() {
    //     store.dispatch("updateSelectedCourtCurrentUsers")
    // },
    data(){
        return {
            currentPlayers: null,
        }
    },
    created() {

        firebase
        .firestore()
        .collection("court")
        .doc(this.courtID)
        .get()
        .then((docRef) => {
            
            this.currentPlayers = docRef.data().currentPlayers

        })
        .then(()=>{
            console.log("Current players successfully retrieved from court");
        })

    },

}
</script>

<style>

</style>