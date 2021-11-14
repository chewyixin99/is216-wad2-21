<template>

    <div class="container max-w-5xl mx-auto">
        <!-- TITLE -->
        <div class="text-center mx-6">
            <div class="primary-gold-title mt-3">
                <h1> {{court.name.toUpperCase()}} </h1>
            </div>
    
            <div class="secondary-white-title italic font-bold">
                <h1> {{court.vicinity.toUpperCase()}} </h1>
            </div>
        </div>

        <!-- BODY CONTENT -->
        <div class="grid grid-cols-1 md:grid-cols-3 mt-5">
            <!-- [Non-Mobile] Left Section -->
            <!-- Maps and Check In Options -->
            <div class="col-span-1 mx-6">
                <court-mini-map-section :courtID="court.id"/>  <!-- ************************************************************ -->
            </div>
    
            <!-- [Non-Mobile] Right Section -->
            <div class="col-span-2 justify-center mx-6">
                <!-- Current Players Section -->
                <div class="mb-6">

                    <div class="flex flex-wrap justify-between">
                        <div class="secondary-gold-title">
                            <h1>CURRENT PLAYERS</h1>
                        </div>
                        <span class="rounded-full bg-gray-700 py-2 px-5 font-bold text-white text-sm">{{
                            typeof $store.state.selectedCourtCurrentUsers.currentPlayers !== 'undefined' ? 
                            $store.state.selectedCourtCurrentUsers.currentPlayers.length :
                            '0'
                        }} P</span>
                    </div>

                    <court-current-players :courtID="court.id" :key="$store.state.reloadKeys"/>
                </div>
        
                <!-- Current Teams Section -->
                <div>
                    <div class="secondary-gold-title mb-3">
                        <h1>CURRENT TEAMS</h1>
                    </div>
                    <court-team :courtID="court.id" :key="$store.state.reloadKeys"/>
                </div>

            <court-conflict-modal :courtID="court.id" v-if="$store.state.checkInConflict"/>

            </div>
        </div>
    </div>
</template>

<script>
import CourtMiniMapSection from "../components/CourtMiniMapSection.vue"
import CourtTeam from "../components/CourtTeam.vue";
import CourtCurrentPlayers from "../components/CourtCurrentPlayers.vue"
import CourtConflictModal from "../components/CourtConflictModal.vue"

export default {
  name: "Court",
  
  components: { CourtMiniMapSection, CourtTeam, CourtCurrentPlayers, CourtConflictModal},

  data() {
    return {
        court: this.$store.state.selectedCourt 
    };
  },

  methods: {

      logStatus(status){
          console.log(status);
      },

  },


};
</script>

<style>
</style>