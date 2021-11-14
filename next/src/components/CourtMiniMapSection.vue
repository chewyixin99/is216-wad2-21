<template>
    <div>
        <!-- Minimap -->
        <div>
            <court-mini-map 
            v-bind:courtObj="this.$store.state.selectedCourt" />
        </div>

        <!-- Check In -->
        <div class="my-4">
            <!-- <the-button :onClick="togglePopUp" class="bg-yellow-500 text-white" buttonType="form-full">
                CHECK IN
            </the-button> -->
            <the-button :onClick="checkIn" class="bg-yellow-500 text-white" buttonType="form-full"> <!--*********************************************************-->
                CHECK IN
            </the-button>
        </div>

        <!-- Check Out -->
        <div class="my-4">
            <the-button :onClick="checkOut" class="bg-white" buttonType="form-full">
                CHECK OUT
            </the-button>
        </div>

        <!-- Bookmark -->
        <div class="my-4">
            <the-button v-if="showBookmark" class="bg-gray-900 text-white" buttonType="form-full" v-on:click="bookmarkCourt()" >
                BOOKMARK
            </the-button>
            <the-button v-else class="bg-gray-900 text-white" buttonType="form-full" v-on:click="bookmarkCourt()" >
                REMOVE BOOKMARK
            </the-button>
        </div>
    </div>
</template>

<script>
import TheButton from "./TheButton.vue"
import CourtMiniMap from "./CourtMiniMap.vue"
import db from "../firebase/firebaseInit"


export default {
    name: "CourtMiniMapSection",
    components: { TheButton, CourtMiniMap },

    data() {
        return {
            courtDatabase: null,
            currentCourtId: "etpohlg3k66q0X5khU4W" // hardcoded
        }
    },
    props: ["courtID"],

    computed: {
        showBookmark() {
            console.log('=== computed bookmark, court mini map section ===')
            let id_dict = this.$store.state.profileBookmarksID
            let id = this.$store.state.selectedCourt.id
            console.log(id_dict)
            console.log(id)
            if (Object.values(id_dict).indexOf(id) > -1) {
                return false
            } 
            return true
        },

        showCheckOut() {
            const checkedInCourtID = this.$store.state.checkedInCourtID
            const lastCheckedInCourtID = this.$store.state.checkedInCourt.id
            const typeLastCheckedInCourtID = typeof lastCheckedInCourtID

            if (typeLastCheckedInCourtID == 'null' || typeLastCheckedInCourtID == 'undefined' || lastCheckedInCourtID == '' || lastCheckedInCourtID == null || lastCheckedInCourtID == undefined ) {
                return false
            }

            if (lastCheckedInCourtID == checkedInCourtID) {
                return true
            } 
            return false
        },
    },

    methods: {
        forceRerender() {
            this.$store.commit("forceRerender")
        },
        
        getCourtData() {
            console.log("==== getCourtData ====");
            db.collection("court").get().then(
                (docSnapshot) => {
                    docSnapshot.forEach((doc) => {
                        console.log(doc.data());
                    })
                }
            )
        },

        bookmarkCourt() {
            console.log('=== bookmark court === ')
            this.$store.dispatch('bookmarkCourt', this.$store.state.selectedCourt)
        },
        
        checkIn(){
            console.log(`=== CourtMiniMapSection checkIn function ===`)
            // Clashing checkin validation
            if (this.$store.state.checkedInCourtID !== "" && this.$store.state.checkedInCourtID !== this.courtID) {
                this.$store.commit("toggleCheckInConflict")
            } else {
                this.$store.commit('updateCheckedInCourt', this.$store.state.selectedCourt)
                this.$store.commit("updateCheckedInCourtId", this.courtID)
                this.$store.dispatch("addCurrentPlayer")
                .then(()=>{
                    this.forceRerender()
                })
            }
        },

        checkOut(){

            if (this.$store.state.checkedInCourtID == ""){
                alert("You have not checked in!")
            }
            else{
                this.$store.dispatch("removeCurrentPlayer")
                .then(()=>{
                    this.forceRerender()
                })
            }
            

        },


    },



}
</script>

<style>

</style>