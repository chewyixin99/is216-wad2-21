<template>
    <div class="mb-4">
        <div class="block text-white text-sm font-bold mb-2" for="favPlayer">
            FAVOURITE PLAYERS
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">        

            <div>
                <Autocomplete @favInput="updateFavPlayer1($event)" :inputs="players" :placeholder="player1"/>
            </div>

            <div>
                <Autocomplete @favInput="updateFavPlayer2($event)" :inputs="players" :placeholder="player2"/>
            </div>

        </div>
    </div>

</template>

<script>

import Autocomplete from "./AutoComplete.vue"

export default ({

    name: "FavPlayer",
    components: {Autocomplete},

    data(){

        return{
            players:[
                'Lebron James', "Kobe Bryant", "IU"
            ],
            test1: null,
            test2: null,
            player1: "First Favourite Player",
            player2: "Second Favourite Player",
        }

    },

    methods: {

        updateFavPlayer1(input){

            this.test1 = input

        },

        updateFavPlayer2(input){

            this.test2 = input

        }
    
    },

})
</script>
