<template>
    <div>
        <!-- Minimap -->
        <div>
            <court-mini-map 
            v-bind:courtObj="this.$store.state.selectedCourt"
            />
        </div>

        <!-- Check In -->
        <div class="my-4">
            <the-button :onClick="togglePopUp" class="bg-yellow-500 text-white" buttonType="form-full">
                CHECK IN
            </the-button>
        </div>

        <!-- Check Out -->
        <div class="my-4">
            <the-button class="bg-white" buttonType="form-full">
                CHECK OUT
            </the-button>
        </div>

        <!-- Bookmark -->
        <div class="my-4">
            <the-button class="bg-gray-900 text-white" buttonType="form-full">
                BOOKMARK
            </the-button>
        </div>
    </div>
</template>

<script>
import store from "../store/index"
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

    methods: {
        togglePopUp() {
            store.commit('courtToggleCheckinHidden')
        },
        
        
        getCourtData() {
            console.log("====getCourtData====");
            db.collection("court").get().then(
                (docSnapshot) => {
                    docSnapshot.forEach((doc) => {
                        console.log(doc.data());
                    })
                }
            )



        }

    },



}
</script>

<style>

</style>