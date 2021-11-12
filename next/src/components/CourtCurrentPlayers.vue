<template>
    <div class="m-4">
        <div class="grid grid-cols-5 sm:grid-cols-8 gap-4 justify-items-center">
            <the-profile-icon 
            v-for="(a_player, index) in $store.state.selectedCourtCurrentUsers" 
            :initials="a_player.profileInitials" 
            :imgSrc="a_player.profileImg"
            :key="index"
            class="font-bold" />
        </div>
    </div>
</template>

<script>
import store from '../store/index'
import TheProfileIcon from "./TheProfileIcon.vue"

export default {
    name: "CourtCurrentPlayers",

    components: {
        TheProfileIcon
    },
    
    mounted() {
        store.dispatch("updateSelectedCourtCurrentUsers")
    },

    created() {
    },

    data() {
        return {
        }
    },

    methods: {
    
    },
}
</script>

<style>

</style>