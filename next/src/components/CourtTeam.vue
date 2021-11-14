<template>
    <div class="w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <court-team-card v-for="item in this.items" :key="item" :item="item" :courtID="courtID"/>
            <court-new-team-card :courtID="courtID"/>
        </div>
    </div>
</template>

<script>
import CourtTeamCard from "./CourtTeamCard.vue"
import CourtNewTeamCard from "./CourtNewTeamCard.vue"
import firebase from 'firebase/compat/app';

export default {

    name: "CourtTeam",
    components: {
        CourtTeamCard,
        CourtNewTeamCard
    },

    props: ["courtID"], // Props should take in court data later on

    data() {
        return {
           teamName: "",
           teamMembers: "",
           items: [],
        }
    },
    methods:{
    },

    // watch: {
    //     '$store.state.checkedInCourtID': function() {
    //         console.log("===================================");
    //         firebase
    //         .firestore()
    //         .collection("court")
    //         .doc(this.courtID)
    //         .collection('courtTeams')
    //         .get()
    //         .then((doc)=>{
    //             doc.docs.forEach((doc)=>{
    //                 this.items.push({id:doc.id,data: doc.data()})
    //             })
    //         })
    //     }
    // },

    created(){
        firebase
        .firestore()
        .collection("court")
        .doc(this.courtID)
        .collection('courtTeams')
        .get()
        .then((doc)=>{
            doc.docs.forEach((doc)=>{
                this.items.push({id:doc.id,data: doc.data()})
            })
        })
    }

}
</script>

<style>

</style>