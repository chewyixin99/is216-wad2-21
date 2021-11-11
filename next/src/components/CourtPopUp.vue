<template>
    <div v-if="$store.state.courtShowCheckinModal && !conflict">
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">

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

                            <div class="grid grid-cols-2 sm:grid-cols-1">
                            <!-- Check In Time -->
                            <div class="my-3 grid grid-cols-1 sm:grid-cols-2 justify-items-center">
                                <div class="col-span-1 text-xl font-bold text-white flex items-center justify-center">
                                    CHECK IN:
                                </div>

                                <div :class="{'bg-red-500': invalidCheckin}"  class="bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-5">
                                    <div class="flex">
                                        <input :class="{'bg-red-500': invalidCheckin}" class="bg-white" type="time" v-model="userCheckinTime">
                                    </div>
                                </div>
                            </div>


                            <!-- Check Out Time -->
                            <div class="my-5 grid grid-cols-2 justify-items-center">
                                <div class="text-xl font-bold text-white flex items-center justify-center">
                                    CHECK OUT:
                                </div>

                                <div :class="{'bg-red-500': invalidCheckout}" class=" bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-5">
                                    <div class="flex">
                                        <input :class="{'bg-red-500': invalidCheckout}" class="bg-white" type="time" v-model="userCheckoutTime">
                                    </div>
                                </div>
                            </div>

                            <!-- Error Message -->
                            <p v-if="invalidCheckin || invalidCheckout" class="text-sm text-red-300 italic">
                                Please check your inputs. Check ins and check outs are allowed between 08:00 to 22:00 daily!
                            </p>


                        </div>

                        <!-- Check In Buttons Section -->
                        <div class=" m-5">
                            <the-button :onClick="clientCheckinValidations" class="bg-yellow-400 mb-4" buttonType="form-full">
                                CHECK IN
                            </the-button>

                            <the-button :onClick="closeModal" class="bg-red-500" buttonType="form-full">
                                CANCEL
                            </the-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="$store.state.courtShowCheckinModal && conflict">
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    

                <div class="inline-block align-bottom bg-purple-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        
                    <!-- Conflict Details Section -->
                    <div class="text-white text-center m-5">
                        <!-- Location Title -->
                        <h3 class="text-xl font-bold text-white italic" id="modal-title">
                            We noticed that you are already checked in at...
                        </h3>

                        <div class="my-5 grid grid-cols-2 justify-items-center">
                            <div class="text-xl font-bold text-white flex items-center justify-center">
                                LOCATION:
                            </div>

                            <div class="bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-5">
                                hello
                            </div>
                        </div>

                        <!-- Check In Time -->
                        <div class="my-5 grid grid-cols-2 justify-items-center">
                            <div class="text-xl font-bold text-white flex items-center justify-center">
                                CHECK IN:
                            </div>

                            <div class="bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-5">
                                hello

                            </div>
                        </div>


                        <!-- Check Out Time -->
                        <div class="my-5 grid grid-cols-2 justify-items-center">
                            <div class="text-xl font-bold text-white flex items-center justify-center">
                                CHECK OUT:
                            </div>

                            <div class=" bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-5">
                                hello
                            </div>
                        </div>

                        <h3 class="text-xl font-bold text-white italic" id="modal-title">
                            Would you like to continue?
                        </h3>

                        <p class="text-sm text-red-300 italic">
                            If you continue with the check in, we will be checking you out of your current court at the current time and checking you into your selected court at your selected time.
                        </p>

                    </div>


                    <!-- Check In Buttons Section -->
                    <div class=" m-5">
                        <the-button :onClick="checkinUserConflict" class="bg-yellow-400 mb-4" buttonType="form-full">
                            CONTINUE
                        </the-button>

                        <the-button :onClick="closeModal" class="bg-red-500" buttonType="form-full">
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
        '$store.state.courtShowCheckinModal': function() {
            this.getTimeData()
        }
    },

    data() {
        return {
            // Local datetime manipulation
            currentDateTime: new Date(),
            defaultDate: null,
            userCheckinTime: null,
            userCheckoutTime:null,

            // Input validation
            minTime: null,
            maxTime: null,
            invalidCheckin: false,
            invalidCheckout: false,

            // Conflict Management
            conflict: false,

            // Dispatch payload
            payload : {
                dbCheckinTime: null,
                dbCheckoutTime: null,
            }
        }
    },

    methods: {
        beforeUnload() {

        },

        closeModal() {
            this.conflict = false
            this.invalidCheckin = false
            this.invalidCheckout = false
            store.commit('courtToggleCheckinModal')
        },

        getTimeData() {
            // Formats current time for user select options
            // let checkoutTime = new Date()
            // checkoutTime.setHours(this.currentDateTime.getHours() + 2)
            this.defaultDate = this.currentDateTime.toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric'})
            
            // TESTCASE
            let currentDateTime = new Date(`${this.defaultDate} 08:00`)
            let checkoutTime = new Date(`${this.defaultDate} 10:00`)
            this.userCheckinTime = currentDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            this.userCheckoutTime = checkoutTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            
            // this.userCheckinTime = this.currentDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            // this.userCheckoutTime = checkoutTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

            this.minTime = new Date(`${this.defaultDate} 08:00`)
            this.maxTime = new Date(`${this.defaultDate} 22:00`)
        },

        clientCheckinValidations() {
            let dbCheckinTime = new Date(`${this.defaultDate} ${this.userCheckinTime}`)
            let dbCheckoutTime = new Date(`${this.defaultDate} ${this.userCheckoutTime}`)
            
            // Validations
            // Check in limitations
            if (dbCheckinTime < this.minTime || dbCheckinTime >= this.maxTime) {
                this.invalidCheckin = true
            } else {
                this.invalidCheckin = false
            }
            
            if (dbCheckoutTime > this.maxTime || dbCheckoutTime < dbCheckinTime) {
                this.invalidCheckout = true
            } else {
                this.invalidCheckout = false
            }

            // No check ins before current time
            if (dbCheckinTime < this.currentDateTime || dbCheckoutTime < this.currentDateTime) {
                this.invalidCheckout = true
                this.invalidCheckout = true
            }

            // Firebase check in attempt
            if (!this.invalidCheckin && !this.invalidCheckout) {
                this.payload.dbCheckinTime = dbCheckinTime
                this.payload.dbCheckoutTime = dbCheckoutTime

                this.dbCheckin()
            }
        },

        dbCheckin() {
            // check why conflict not working

            console.log(store.state.profileMostRelevantCheckout);
            console.log(this.payload.dbCheckinTime);
            console.log(store.state.profileMostRelevantCheckout > this.payload.dbCheckinTime);

            if (store.state.profileActiveCourt !== null && store.state.profileMostRelevantCheckout > this.payload.dbCheckinTime) {
                // Alert user that he already has an exisitng check in
                // Prompt if its ok to checkout at the selected time for the existing checkin and place a new checkin
                this.conflict = true
            } else {
                store.dispatch("addCheckinHistory", this.payload)
                this.closeModal()
            }
        },

        checkinUserConflict() {
            this.getDbTimeFormat()
            store.dispatch("addConflictedCheckinHistory", this.payload)
            this.closeModal()
        }


    },

}
</script>

<style>

</style>