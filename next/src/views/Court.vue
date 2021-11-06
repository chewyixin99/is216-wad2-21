<template>


    <div class="container max-w-5xl mx-auto">
        <!-- TITLE -->
        <div class="text-center mx-6">
             <!-- button to be removed -->
            <button v-on:click="checkData()">test</button>
            <!-- button above to be removed -->
            <div class="primary-gold-title mt-3">
                <h1>{{courtName.toUpperCase()}}</h1>
            </div>
    
            <div class="secondary-white-title italic font-bold">
                <h1>{{courtAddress.toUpperCase()}}</h1>
            </div>
        </div>

        <!-- BODY CONTENT -->
        <div class="grid grid-cols-1 md:grid-cols-3 mt-5">
            <!-- [Non-Mobile] Left Section -->
            <!-- Maps and Check In Options -->
            <div class="col-span-1 mx-6">
                <court-mini-map-section/>
            </div>
    
            <!-- [Non-Mobile] Right Section -->
            <div class="col-span-2 justify-center mx-6">
                <!-- Current Players Section -->
                <div class="mb-6">
                    <div class="secondary-gold-title">
                        <h1>CURRENT PLAYERS</h1>
                    </div>
                    <court-current-players/>
                </div>
        
                <!-- Current Teams Section -->
                <div>
                    <div class="secondary-gold-title">
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
      },

    //   to delete
      checkData() {
          console.log(this.$store.state.selectedCourt)
      }
  },
};
</script>

<style>
</style>