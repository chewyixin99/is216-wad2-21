<template>
    <div class="w-full bg-gray-700 rounded-lg border-dashed border-4 border-gray-900 p-10 flex flex-col justify-between items-center h-96">
        <div class="text-center mb-10">
            <p class="text-2xl text-yellow-500 font-bold">CREATE NEW TEAM</p>
        </div>

        <div>
            <the-button @click="addTeam" class="text-2xl text-center text-gray-700 bg-yellow-500 " button-type="add">
                <slot>+</slot>
            </the-button>
        </div>

        <div >
            <!-- For flexbox's space between -->
            &nbsp;
        </div>
    </div>
    <modal-notify v-if="modalActive" @closeModal="closeModal" class="mb-10" :modalMessage="modalMessage"></modal-notify>

</template>

<script>
import TheButton from './TheButton.vue'
import ModalNotify from './modalNotify.vue'

export default {
    name: "CourtNewTeamCard",
    components: { 
        TheButton,
        ModalNotify
    },

    data() {
        return {
            modalActive: false,
            modalMessage: "You have to check in before you can create team!"
        }
    },

    props: ["courtID"],

    methods: {
        forceRerender() {
            this.$store.commit('forceRerender')
        },

        addTeam(){

            if (this.$store.state.checkedInCourtID == this.courtID){
                this.$store.dispatch("addTeam")
                .then(()=>{
                    this.forceRerender()
                })
            }
            else{               
                this.modalActive = true
            }
        },

        closeModal() {
            this.modalActive = false
        }

    },

}
</script>


<style>

</style>