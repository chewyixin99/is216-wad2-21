<template>
    <div>

        <div>
            <Autocomplete @favInput="updateFavTeam($event)" :inputs="teams" :placeholder="teamPH" :fav="favTeam"/>
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
            teamPH: "What's your dream team?",
            favTeam: this.$store.state.profileFavTeam,
            input: "",
        }

    },

    methods: {

        updateFavTeam(input){

            this.input = input
            
        },

        emitFavTeam(){

            this.$emit("emitFavTeam", this.input)

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
