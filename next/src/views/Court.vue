<template>
    <!-- Page Header -->
    <div>
        <div class="text-center">
            <div class="text-3xl text-yellow-500 font-bold m-4">
                <h1>{{courtName.toUpperCase()}}</h1>
            </div>
    
            <div class="text-xl text-white italic font-bold m-4">
                <h1>{{courtAddress.toUpperCase()}}</h1>
            </div>
        </div>
        
        <div class="grid grid-cols-12 gap-4">
            <!-- [Non-Mobile] Left Section -->
            <!-- Maps and Check In Options -->
            <div class="col-start-3 col-span-2">
                <court-mini-map-section/>
            </div>
    
            <!-- [Non-Mobile] Right Section -->
            <div class="col-span-6">
                <!-- Current Players Section -->
                <div>
                    <div class="text-2xl text-yellow-500 font-bold mx-4">
                        <h1>CURRENT PLAYERS</h1>
                    </div>
                    <court-current-players/>
                </div>
        
                <!-- Current Teams Section -->
                <div>
                    <div class="text-2xl text-yellow-500 font-bold m-4">
                        <h1>CURRENT TEAMS</h1>
                    </div>
                    <court-team/>
                </div>

                <court-pop-up :hidden="isHidden"/>
            </div>
        </div>
    </div>
</template>

<script>
import CourtMiniMapSection from "../components/CourtMiniMapSection.vue"
import CourtTeam from "../components/CourtTeam.vue";
import CourtCurrentPlayers from "../components/CourtCurrentPlayers.vue"
import CourtPopUp from "../components/CourtPopUp.vue"

export default {
  name: "Court",
  components: { CourtMiniMapSection, CourtTeam, CourtCurrentPlayers, CourtPopUp },

  data() {
    return {
        isHidden: false,

        //   Hardcoded
        courtName: "Heartbeat@Bedok ActiveSG Swimming Complex",
        courtAddress: "11 Bedok North Street 1, Singapore 469662",

    };
  },

  methods: {
      logStatus(status){
          console.log(status);
      }
  },
};
</script>

<style>
</style>