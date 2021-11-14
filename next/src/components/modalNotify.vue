<template>

    <div class="fixed z-10">
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div class="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">

                <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    
                            <!-- This element is to trick the browser into centering the modal contents.  -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    

                <div class="inline-block align-bottom bg-purple-900 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg mx-6 p-5">

                    
                    <div>

                        <p class="text-white mb-3">{{this.modalMessage}}</p>

                        <the-button @click="$emit('closeModal')" class="bg-yellow-500 hover:bg-yellow-700 text-white mt-3" buttonType="form-sm">
                            OK
                        </the-button>

                    </div>
                    
                </div>

            </div>

        </div>

    </div>

</template>

<script>

import TheButton from "./TheButton.vue"

export default ({

    name: "ModalNotify",

    props: ["modalMessage"],
    
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
