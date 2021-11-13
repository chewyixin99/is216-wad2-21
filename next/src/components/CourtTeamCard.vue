<!-- 
--- Court Team Cards ---
Team cards take in a single team's info and populates the card.
Team card spans the entire width of its container, so it requries container divs to format responsiveness.
-->


<template>
    <div class="w-full bg-gray-800 rounded-lg p-4">

        <div class="text-center mb-5">
            <p class="text-2xl text-yellow-500 font-bold">{{teamName}}</p>
        </div>
        <div class="my-3">
            <ol class="grid md:grid">
                <Members :member1 = member v-for="member in teamMembers" :key="member"/>
            </ol>
        </div>

        <div class="mt-6">
            <the-button @click="joinTeam" class="bg-yellow-500 text-white" button-type="form-full">
                <slot>JOIN</slot>
            </the-button>
        </div>
        <div class="mt-3">
            <the-button @click="leaveTeam" class="bg-red-500 text-white" button-type="form-full">
                <slot>LEAVE</slot>
            </the-button>
        </div>


    </div>

</template>

<script>
import Members from './Members.vue';
import TheButton from './TheButton.vue'
import firebase from 'firebase/compat/app';
// import TheProfileIcon from './TheProfileIcon.vue'



export default {
    name: "CourtTeamCard",
    data(){
        return{
            teamName: this.item.data.teamName,
            teamMembers: this.item.data.teamMembers,
            teamID: this.item.id,
            disabled: null,
        }
    },
    props: ["item","courtID"],

    components: { 
        // TheProfileIcon,
        TheButton,
        Members,

    },

    methods:{

        joinTeam(){

            if (this.$store.state.checkedInCourtID == this.courtID){

                firebase
                .firestore()
                .collection("court")
                .doc(this.courtID)
                .collection('courtTeams')
                .doc(this.teamID)
                .update({

                    teamMembers: firebase.firestore.FieldValue.arrayUnion(this.$store.state.profileID)

                })
                .then(()=>{

                    location.reload()

                })
            }
            else{

                alert("You have to check in before you can join team!")

            }

            

        },

        leaveTeam(){

            console.log(this.teamMembers);
            console.log("jereeeeeeeeeeeeee");
            console.log(this.teamMembers.includes(this.$store.state.profileID));

            if (this.$store.state.checkedInCourtID == this.courtID && this.teamMembers.includes(this.$store.state.profileID)){

            
                if (this.teamMembers.length > 1){

                    firebase
                    .firestore()
                    .collection("court")
                    .doc(this.courtID)
                    .collection('courtTeams')
                    .doc(this.teamID)
                    .update({

                        teamMembers: firebase.firestore.FieldValue.arrayRemove(this.$store.state.profileID)

                    })
                    // .then(()=>{

                    //     location.reload()

                    // })
                }
                else{

                    firebase
                    .firestore()
                    .collection("court")
                    .doc(this.courtID)
                    .collection('courtTeams')
                    .doc(this.teamID)
                    .delete()
                    // .then(()=>{

                    //     location.reload()

                    // })

                }
            }
            else{
                alert("You cannot leave a team if you are not in it!")
            }
        }
    },

    // created(){

    //     if (this.teamMembers.length >11){
    //         this.disabled = true
    //     }
    //     else{
    //         this.disabled = false
    //     }

    //     console.log(this.disabled);


    // }

}
</script>

<style>

</style>