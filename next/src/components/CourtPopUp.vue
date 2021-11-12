<template>
<div>
    <!-- Check in modal 
    <div v-if="$store.state.courtShowCheckinModal && !conflict">
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">

                <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
                This element is to trick the browser into centering the modal contents. 
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    

                <div class="inline-block align-bottom bg-purple-900 rounded-lg overflow-hidden shadow-xl transform transition-all mx-6">
                        
                        Check In Details Section 
                        <div class="text-white text-center m-5">
                            < Check In Title 
                            <h3 class="text-xl font-bold text-white" id="modal-title">
                                CHECK IN DETAILS
                            </h3>

                            <Check In Text 
                            <div class="m-2">
                                <p class="text-sm text-white italic">
                                    Select the date and time that you would be heading down to the court!
                                </p>
                            </div>

                            <div class="grid grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
                            <Check In Time 
                            <div class="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-2">
                                <div class="col-span-1 text-xl font-bold text-white flex items-center justify-center">
                                    CHECK IN:
                                </div>

                                <div :class="{'bg-red-500': invalidCheckin || pastInputError  || clashingCheckIO}"  class="bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-3">
                                    <div class="flex">
                                        <input :class="{'bg-red-500': invalidCheckin || pastInputError || clashingCheckIO}" class="bg-white" type="time" v-model="userCheckinTime">
                                    </div>
                                </div>
                            </div>


                             Check Out Time 
                            <div class="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-2">
                                <div class="text-xl font-bold text-white flex items-center justify-center">
                                    CHECK OUT:
                                </div>

                                <div :class="{'bg-red-500': invalidCheckout || pastInputError || clashingCheckIO}" class=" bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-3">
                                    <div class="flex">
                                        <input :class="{'bg-red-500': invalidCheckout || pastInputError || clashingCheckIO}" class="bg-white" type="time" v-model="userCheckoutTime">
                                    </div>
                                </div>
                            </div>

                             Error Message 
                            <p v-if="clashingCheckIO" class="text-sm text-red-300 italic">
                                Please check your inputs. Check ins should be smaller than check outs!
                            </p>

                            <p v-if="invalidCheckin || invalidCheckout" class="text-sm text-red-300 italic">
                                Please check your inputs. Check ins and check outs are allowed between 08:00 to 22:00 daily!
                            </p>

                            <p v-if="pastInputError" class="text-sm text-red-300 italic">
                                Please check your inputs. Check ins and check outs are only permitted from the present time onwards!
                            </p>


                        </div>

                         Check In Buttons Section 
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
                            <the-button :onClick="clientCheckinValidations" class="bg-yellow-500 sm:order-last" buttonType="form-full">
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
    -->

    <!--Active conflict modal 
    <div v-if="$store.state.courtShowCheckinModal && conflict">
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
                 This element is to trick the browser into centering the modal contents. 
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    

                <div class="inline-block align-bottom bg-purple-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        
                     Conflict Details Section 
                    <div class="text-white text-center m-5">
                         Location Title 
                        <h3 class="text-xl font-bold text-white italic" id="modal-title">
                            We noticed that you are already checked in at
                        </h3>

                        <div class="my-3 text-center">
                            <div class="secondary-white-title font-bold">
                                {{$store.state.profileActiveCourt.name}}
                            </div>
                        </div>

                         Check In Time 
                        <div class="my-5 grid grid-cols-2 justify-items-center">
                            <div class="text-xl font-bold text-white flex items-center justify-center">
                                CHECK IN:
                            </div>

                            <div class="bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-3">
                                {{$store.state.profileMostRelevantCheckin.toLocaleTimeString()}}
                            </div>
                        </div>


                         Check Out Time 
                        <div class="my-5 grid grid-cols-2 justify-items-center">
                            <div class="text-xl font-bold text-white flex items-center justify-center">
                                CHECK OUT:
                            </div>

                            <div class=" bg-white text-xl font-bold text-black text-center rounded-lg shadow-xl p-3">
                                {{$store.state.profileMostRelevantCheckout.toLocaleTimeString()}}
                            </div>
                        </div>

                        <h3 class="text-xl font-bold text-white italic" id="modal-title">
                            Would you like to continue?
                        </h3>

                        <p class="text-sm text-red-300 italic">
                            If you continue with the check in, we will be checking you out of your current court and checking you into your selected court at your selected time.
                        </p>

                    </div>


                     Check In Buttons Section 
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
                        <the-button :onClick="checkinUserConflict" class="bg-yellow-500 sm:order-last" buttonType="form-full">
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
    -->
</div>
</template>

<script>
import store from "../store/index"
// import TheButton from "./TheButton.vue"
import moment from "moment"


export default {
    name: "CourtPopUp",
    components: { 
        // TheButton 
        },
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
            clashingCheckIO: false,
            pastInputError: false,

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
            this.clashingCheckIO = false

            store.commit('courtToggleCheckinModal')
        },

        getTimeData() {
            // Formats current time for user select options
            let checkoutTime = new Date()
            console.log(moment().format("MMM DD YY"));
            checkoutTime.setHours(this.currentDateTime.getHours() + 1)
            this.defaultDate = this.currentDateTime.toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric'}).split("/")
            // this.defaultDate = `${this.defaultDate[1]}/${this.defaultDate[0]}/${this.defaultDate[2]}`
            this.defaultDate = `${this.defaultDate[2]}-${this.defaultDate[0]}-${this.defaultDate[1]}`
            console.log(this.defaultDate);
            console.log("xD");
            this.userCheckinTime = this.currentDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            this.userCheckoutTime = checkoutTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

            this.minTime = new Date(`${this.defaultDate} 08:00`)
            this.maxTime = new Date(`${this.defaultDate} 22:00`)
        },

        clientCheckinValidations() {
            console.log(store.state.selectedCourt);
            console.log(this.userCheckinTime);
            console.log((`${this.defaultDate} ${this.userCheckinTime}`));
            console.log(this.defaultDate);
            console.log(this.userCheckinTime);
            // let dbCheckinTime = new Date(`${this.defaultDate} ${this.userCheckinTime}`)
            // let dbCheckinTime = new Date(`${this.defaultDate}T${this.userCheckinTime}:00.000`)
            let dbCheckinTime = moment().subtract(10, 'days').calendar()
            console.log(dbCheckinTime);
            console.log("hereeeeeeeee");
            let dbCheckoutTime = new Date(`${this.defaultDate}T${this.userCheckoutTime}:00.000`)

            console.log(`${this.defaultDate}T${this.userCheckinTime}:00.000`);
            // Validations
            // Check in smaller than check out vcalidation
            console.log(!(dbCheckinTime < dbCheckoutTime));
            if (!(dbCheckinTime < dbCheckoutTime)) {
                this.clashingCheckIO = true
            } else {
                this.clashingCheckIO = false
            }

            // // Check in minmax time limitations
            if (dbCheckinTime < this.minTime || dbCheckinTime >= this.maxTime) {
                this.invalidCheckin = true
            } else {
                this.invalidCheckin = false
            }
            
            if (dbCheckoutTime < this.minTime || dbCheckoutTime >= this.maxTime) {
                this.invalidCheckout = true
            } else {
                this.invalidCheckout = false
            }

            // Do not permit checkins more than 5 mins before current time

            let pastInputDateCheck = new Date()
            pastInputDateCheck.setMinutes(this.currentDateTime.getMinutes() - 5)

            if (dbCheckinTime < pastInputDateCheck || dbCheckoutTime < pastInputDateCheck) {
                this.pastInputError = true
            } else {
                this.pastInputError = false
            }

            // Firebase check in attempt
            if (!this.invalidCheckin && !this.invalidCheckout && !this.pastInputError && !this.clashingCheckIO) {
                this.payload.dbCheckinTime = dbCheckinTime
                this.payload.dbCheckoutTime = dbCheckoutTime

                this.dbCheckin()
            }
        },

        dbCheckin() {
            if (store.state.profileActiveCourt !== null && store.state.profileMostRelevantCheckout > this.payload.dbCheckinTime) {
                // User is currently ACTIVE on a court and attempting to check in within his current check in time range.
                this.conflict = true
            } else {
                store.dispatch("addCheckinHistory", this.payload)
                this.closeModal()
            }
        },

        checkinUserConflict() {
            store.dispatch("addConflictedCheckinHistory", this.payload)
            this.closeModal()
        },




    },

}
</script>

<style>

</style>