<template>

    <div>
        <div v-if="flag" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div class="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">

                <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    
                            <!-- This element is to trick the browser into centering the modal contents.  -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    

                <div class="inline-block align-bottom bg-purple-900 rounded-lg overflow-hidden shadow-xl transform transition-all w-80 mx-6 p-5">
                    
                    <div class="text-center">

                        <div>
                            <label class="block text-white text-sm font-bold mb-2" for="prompt">
                                ENTER USER ID OF NEW MEMBER:
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="prompt" type="text" v-model="input">
                        </div>

                        <div class="flex mt-3 space-x-2">
                            <the-button @click="$emit('closeModal')" class="bg-red-500 hover:bg-red-700 text-white" buttonType="form-full">
                                CANCEL
                            </the-button>

                            <the-button @click="$emit('prompt',this.input);$emit('closeModal')" class="bg-green-500 hover:bg-green-700 text-white" buttonType="form-full">
                                CONFIRM
                            </the-button>
                        </div>

                    </div>
                    
                </div>

            </div>

        </div>

    </div>

</template>

<script>

import TheButton from "./TheButton.vue"

export default ({

    name: "ModalAddMembers",

    props: ["modalMessage", "flag"],
    
    components: {

        TheButton

    },

    data(){

        return{

            input: "",

        }

    },

    methods: {

    },

    created(){

    }

})

</script>
