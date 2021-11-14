<template>
    <div>
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">

                <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true">
                </div>
    
                <!-- This element is to trick the browser into centering the modal contents.  -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    

                <div class="inline-block align-bottom bg-purple-900 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg mx-6 p-5">
                        
                    <h3 class="text-xl font-bold text-white mb-3" id="modal-title">
                        We noticed that you are already checked in at...
                    </h3>

                    <div class="text-center mb-3">
                        <div class="secondary-gold-title font-bold">
                            {{conflictCourtName}}
                        </div>
                        <div class="secondary-white-title font-bold">
                            {{conflictCourtVicinity}}
                        </div>
                    </div>

                    <div class="mb-5">
                        <p class="text-sm text-red-500 font-bold italic">
                            Click on continue to check out of the current court and check in to this selected court.
                        </p>
                        <!-- <p class="text-sm text-red-500 italic">
                            Would you like to continue?
                        </p> -->
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <the-button :onClick="checkIn" class="bg-yellow-500 text-white sm:order-last col-span-1" buttonType="form-full">
                            CONTINUE
                        </the-button>

                        <the-button :onClick="cancel" class="bg-red-500 text-white col-span-1" buttonType="form-full">
                            CANCEL
                        </the-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheButton from "./TheButton.vue"
import firebase from 'firebase/compat/app';

export default {
    name: "CourtPopUp",
    components: { TheButton },
    props: ["courtID"],


    data() {
        return {
            conflictCourtName: null,
            conflictCourtVicinity: null,
        }
    },
    
    mounted() {
        console.log(this.$store.state.checkedInCourtID);
        const conflictCourtDoc = firebase.firestore().collection("court").doc(this.$store.state.checkedInCourtID)

        conflictCourtDoc.get()
        .then((conflictCourtData) => {
            this.conflictCourtName = conflictCourtData.data().courtName
            this.conflictCourtVicinity = conflictCourtData.data().courtVicinity
        })
        
    },

    methods: {
        forceRerender() {
            this.$store.commit("forceRerender")
        },
        
        checkIn(){
            // Upon continuing:
            // Remove user from current check in
            this.$store.dispatch("removeCurrentPlayer")
            .then(() => {
                // Update player's new selected court
                this.$store.commit("updateCheckedInCourtId", this.courtID)
                this.$store.commit("updateCheckedInCourt", this.$store.state.selectedCourt)
                // Add player to new court
                this.$store.dispatch("addCurrentPlayer").then(() => {
                    this.$store.commit("toggleCheckInConflict")
                    this.forceRerender()
                })
            })

        },

        cancel() {
            this.$store.commit("toggleCheckInConflict")
        }

    },

}
</script>

<style>

</style>