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
            {{ $store.state.selectedCourt }}
            {{ $store.state.profileID }}
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
    },

    methods: {
        
        
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
            this.$store.commit("updateCheckedInCourtId", this.courtID)
            console.log(this.courtID);
            console.log("court id");
            this.$store.dispatch("addCurrentPlayer")
            .then(()=>{
                location.reload();
            })
        },

        checkOut(){

            if (this.$store.state.checkedInCourtID == ""){
                alert("You have not checked in!")
            }
            else{
                this.$store.dispatch("removeCurrentPlayer")
                .then(()=>{
                    location.reload();
                })
            }
            

        },


    },



}
</script>

<style>

</style>