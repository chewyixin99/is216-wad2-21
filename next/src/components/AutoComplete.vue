<template>
    <label class="block text-white text-sm font-bold mb-2" for="fav">

        <input name="fav" type="text" v-model="input" @focus="modal=true" :placeholder="placeholder" autocomplete="off" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        @input="filterInput();clearFilteredInputs();$emit('favInput',this.input)">
        
        <div v-if="filteredInputs!=[] && modal && input!=='' ">
            <ul class="w-48 bg-gray-800 text-white">

                <li v-for="filteredInput in filteredInputs" :key="filteredInput" class="border-b bg-white cursor-pointer shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                @click="setInput(filteredInput);$emit('favInput',this.input)">{{filteredInput}}</li>

            </ul>
        </div>
    </label>


</template>

<script>


export default ({

    name: "Autocomplete",
    props: ["inputs","placeholder"],
    data(){

        return{
            input: "",
            modal: false,
            filteredInputs: [],
        }

    },

    methods: {

        filterInput(){
            
            if (this.input.length > 2)
                this.filteredInputs = this.inputs.filter(input => {
                    return input.toLowerCase().startsWith(this.input.toLowerCase())
                })

        },

        clearFilteredInputs(){

            if (this.input.length <= 2){
                this.filteredInputs = []
            }

        },

        setInput(input){
            this.input = input;
            this.modal = false;
        }


    },

})
</script>
