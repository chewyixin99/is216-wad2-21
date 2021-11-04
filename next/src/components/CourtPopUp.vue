<template>
    <div v-if="!isHidden">
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
                                    <select name="hours" class="font-bold bg-transparent appearance-none outline-none">
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
                                    <select name="minutes" class="bg-transparent text-xl font-bold appearance-none outline-none mr-4">
                                        <option value="0">00</option>
                                        <option value="30">30</option>
                                    </select>
                                    <select name="ampm" class="bg-transparent text-xl font-bold appearance-none outline-none">
                                        <option value="am">AM</option>
                                        <option value="pm">PM</option>
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
                                    <select name="hours" class="font-bold bg-transparent appearance-none outline-none">
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
                                    <select name="minutes" class="bg-transparent text-xl font-bold appearance-none outline-none mr-4">
                                        <option value="0">00</option>
                                        <option value="30">30</option>
                                    </select>
                                    <select name="ampm" class="bg-transparent text-xl font-bold appearance-none outline-none">
                                        <option value="am">AM</option>
                                        <option value="pm">PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                    </div>

                    <!-- Check In Buttons Section -->
                    <div class=" m-5">
                        <the-button class="bg-yellow-400 mb-4" buttonType="form-full">
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
import TheButton from "./TheButton.vue"

export default {
    name: "CourtPopUp",
    components: { TheButton },
    props: {
        hidden: {
            type: Boolean,
            default: false
        },
        currentCourtId: {
            type: String
        }
    },

    data() {
        return {
            isHidden: this.hidden,
            userCheckinHr: "",
            userCheckinMin: "",
            userCheckoutHr: "",
            userCheckoutMin: "",
        }
    },

    updated() {
        if(!this.isHidden) {
            this.getDisplayTimes()
        }
    },


    methods: {
        cancel() {
            this.isHidden = true
        },

        getDisplayTimes() {
            // Today passed into system
            let today = new Date()
            console.log(today); 
            
            // Checkin time computed and passed to user (default)
            
            // Checkout time computed +2 hrs passed to user (default)
            // let date = today.getFullYear()
            // let checkinTime = 
            // let checkoutTime = 
        },

        getDbTimeFormat() {
            // Takes in this time (whether user inputs or not) and formats
        },

        updateDb() {
            // Takes in formatted time data and passes to db @user/courtsPlayed/ where courtId == courtId update checkInTime and check
        }
    },

}
</script>

<style>

</style>