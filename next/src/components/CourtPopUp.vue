<template>
    <div v-if="!$store.state.courtCheckinHidden">
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    

                <div class="inline-block align-bottom bg-purple-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        
                    <!-- Check In Details Section -->
                    <div class="text-white text-center m-5">
                        <!-- Check In Title -->
                        <h3 class="text-xl font-bold text-white" id="modal-title">
                            CHECK IN DETAILS
                        </h3>

                        <!-- Check In Text -->
                        <div class="m-2">
                            <p class="text-sm text-white italic">
                                Select the date and time that you would be heading down to the court!
                            </p>
                        </div>

                        <!-- Check In Time -->
                        <div class="my-5 grid grid-cols-2 justify-items-center">
                            <div class="text-xl font-bold text-white flex items-center justify-center">
                                CHECK IN:
                            </div>

                            <div class="bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-5">
                                <div class="flex">
                                    <select name="hours" class="font-bold bg-transparent appearance-none outline-none" v-model="userCheckinHr">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">10</option>
                                        <option value="12">12</option>
                                    </select>

                                    <span class="text-xl font-bold mr-3">:</span>

                                    <select name="minutes" class="bg-transparent text-xl font-bold appearance-none outline-none mr-4" v-model="userCheckinMin">
                                        <option value="0">00</option>
                                        <option value="30">30</option>
                                    </select>

                                    <select name="ampm" class="bg-transparent text-xl font-bold appearance-none outline-none" v-model="userCheckinAmPm">
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <!-- Check In Time -->
                        <div class="my-5 grid grid-cols-2 justify-items-center">
                            <div class="text-xl font-bold text-white flex items-center justify-center">
                                CHECK OUT:
                            </div>

                            <div class=" bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-5">
                                <div class="flex">
                                    <select name="hours" class="font-bold bg-transparent appearance-none outline-none" v-model="userCheckoutHr">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>

                                    <span class="text-xl font-bold mr-3">:</span>
                                    
                                    <select name="minutes" class="bg-transparent text-xl font-bold appearance-none outline-none mr-4" v-model="userCheckoutMin">
                                        <option value="0">00</option>
                                        <option value="30">30</option>
                                    </select>

                                    <select name="ampm" class="bg-transparent text-xl font-bold appearance-none outline-none" v-model="userCheckoutAmPm">
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Check In Buttons Section -->
                    <div class=" m-5">
                        <the-button :onClick="checkinUser" class="bg-yellow-400 mb-4" buttonType="form-full">
                            CHECK IN
                        </the-button>

                        <the-button :onClick="cancel" class="bg-red-500" buttonType="form-full">
                            CANCEL
                        </the-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store/index"
import TheButton from "./TheButton.vue"

export default {
    name: "CourtPopUp",
    components: { TheButton },

    watch: {
        '$store.state.courtCheckinHidden': function() {
            this.getCurrentTime()
        }
    },

    data() {
        return {
            // Local datetime manipulation
            defaultDate: null,

            userCheckinHr: null,
            userCheckinMin: null,
            userCheckinAmPm: null,

            userCheckoutHr: null,
            userCheckoutMin: null,
            userCheckoutAmPm: null,

            payload : {
                dbCheckinTime: null,
                dbCheckoutTime: null,
            }
        }
    },


    methods: {
        cancel() {
            store.commit('courtToggleCheckinHidden')
        },

        getCurrentTime() {
            // Formats current time for user select options
            let coeff = 1000 * 60 * 30
            let rawDateTime = new Date()
            let currentDateTime = new Date(Math.round(rawDateTime.getTime() / coeff) * coeff)

            this.defaultDate = currentDateTime.toLocaleDateString().split("/").reverse().map(date => Number(date))
            let currentTime = currentDateTime.toLocaleTimeString().split(":")

            this.userCheckinHr = Number(currentTime[0])
            this.userCheckinMin = Number(currentTime[1])

            if (this.userCheckinHr > 12) {
                this.userCheckinHr = Number(currentTime[0]) - 12
                this.userCheckinAmPm = "PM"
            } else {
                this.userCheckinAmPm = "AM"
            }

            this.userCheckoutHr = Number(currentTime[0]) + 2
            this.userCheckoutMin = Number(currentTime[1])

            if (this.userCheckoutHr > 12) {
                this.userCheckoutHr = Number(currentTime[0]) - 10
                this.userCheckoutAmPm = "PM"
            } else {
                this.userCheckoutAmPm = "AM"
            }
        },

        getDbTimeFormat() {
            // Format into date object for firestore
            let dbCheckinHr = null
            let dbCheckoutHr = null

            if (this.userCheckinAmPm == "AM") {
                dbCheckinHr = this.userCheckinHr
            } else {
                dbCheckinHr = this.userCheckinHr + 12
            }

            if (this.userCheckoutAmPm == "AM") {
                dbCheckoutHr = this.userCheckoutHr
            } else {
                dbCheckoutHr = this.userCheckoutHr + 12
            }

            this.payload.dbCheckinTime = new Date(this.defaultDate[0], this.defaultDate[1] - 1, this.defaultDate[2], dbCheckinHr, this.userCheckinMin)
            this.payload.dbCheckoutTime = new Date(this.defaultDate[0], this.defaultDate[1] - 1, this.defaultDate[2], dbCheckoutHr, this.userCheckoutMin)
        },

        updateStore() {
            // Compare store data and user input data,
            // If latest check out is smaller than the current check in (no conflict):
            //      Create new instance of check in to a current court
            // Else (conflict exists):
            //      Prompt if want to update to current court
            //      Update check out instance of old court

            if (this.payload.dbCheckinTime < store.state.profileLatestCheckout) {
                console.log("[CourtPopUp] Conflict");
            } else {
                
                console.log("[CourtPopUp] Successfully added.");
            }


        },

        checkinUser() {
            /*
                Upon clicking checkout:
                1. Check if the user currently checked in from store state
                ---
                If checked in:
                2. Tell the user that he is already checked in to court id at what time
                and prompt for override
                ---
                Else:
                2. Formats time
                2. Updates VueX store
                3. Updates DB
            */
            this.getDbTimeFormat()
            this.updateStore()



        }
    },

}
</script>

<style>

</style>