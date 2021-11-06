<template>
    <div class="m-4">
        <div class="grid grid-cols-5 sm:grid-cols-8 gap-4 justify-items-center">
            <the-profile-icon v-for="(a_player, index) in this.currentPlayers" :initials="a_player.initials" :key="index"
            class="font-bold" />
        </div>
    </div>
</template>

<script>
import TheProfileIcon from "./TheProfileIcon.vue"

export default {
    name: "CourtCurrentPlayers",
    components: {
        TheProfileIcon
    },
    props: {}, // Props should take in array of current players later on


    data() {
        return {
            currentPlayers: [
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                },
                {
                    initials: "BL",
                    username: "Bitta Loong"
                }
        ]
        }
    }
}
</script>

<style>

</style>