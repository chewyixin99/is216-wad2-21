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
        
        <div>
            <!-- [Non-Mobile] Left Section -->
            <!-- Maps and Check In Options -->
            <div>
    
            </div>
    
            <!-- [Non-Mobile] Right Section -->
            <div>
                <!-- Current Players Section -->
                <div class="">
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
            </div>
        </div>
    </div>
</template>

<script>
import CourtTeam from "../components/CourtTeam.vue";
import CourtCurrentPlayers from "../components/CourtCurrentPlayers.vue"

export default {
  name: "court",
  components: { CourtTeam, CourtCurrentPlayers },

  data() {
    return {
      //   Hardcoded
      courtName: "Heartbeat@Bedok ActiveSG Swimming Complex",
      courtAddress: "11 Bedok North Street 1, Singapore 469662",

    };
  },

  methods: {},
};
</script>

<style>
</style>