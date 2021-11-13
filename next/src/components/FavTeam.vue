<template>
    <div class="mb-4">
        <div class="block text-white text-sm font-bold mb-2" for="favPlayer">
            FAVOURITE TEAM
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">        

            <div>
                <Autocomplete @favInput="updateFavTeam1($event)" :inputs="teams" :placeholder="teamPH1" :fav="favTeam1"/>
            </div>

            <div>
                <Autocomplete @favInput="updateFavTeam2($event)" :inputs="teams" :placeholder="teamPH2" :fav="favTeam2"/>
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
            teamPH1: "First Favourite Team",
            teamPH2: "Second Favourite Team",
            favTeam1: this.$store.state.profileFavTeam1,
            favTeam2: this.$store.state.profileFavTeam2,
        }

    },

    methods: {

        updateFavTeam1(input){

            this.$store.commit("changeFavTeam1", input)
            .then(()=>{
                console.log("fav1 committed for store");
            })
        },

        updateFavTeam2(input){


            this.$store.commit("changeFavTeam2", input)
            .then(()=>{
                console.log("fav2 committed for store");
            })
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
