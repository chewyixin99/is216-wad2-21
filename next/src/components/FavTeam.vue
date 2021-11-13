<template>
    <div class="mb-4">
        <div class="block text-white text-sm font-bold mb-2" for="favPlayer">
            FAVOURITE TEAM
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">        

            <div>
                <Autocomplete @favInput="updateFavTeam1($event)" :inputs="teams" :placeholder="team1"/>
            </div>

            <div>
                <Autocomplete @favInput="updateFavTeam2($event)" :inputs="teams" :placeholder="team2"/>
            </div>

        </div>
    </div>

</template>

<script>
import axios from "axios"
import Autocomplete from "./AutoComplete.vue"

export default ({

    name: "FavTeamr",
    components: {Autocomplete},

    data(){

        return{
            teams: [],
            test1: null,
            test2: null,
            team1: "First Favourite Team",
            team2: "Second Favourite Team",
        }

    },

    methods: {

        updateFavTeam1(input){

            this.test1 = input

        },

        updateFavTeam2(input){

            this.test2 = input

        }
    
    },

    created(){
        
      let url = "https://www.balldontlie.io/api/v1/teams";
      axios
      .get(url)
      .then((response)=>{

        let retrievedData = response.data.data
        for (let i=0; i<retrievedData.length; i++){
            this.teams.push(retrievedData[i].full_name);
        }
      })
    }

})
</script>
