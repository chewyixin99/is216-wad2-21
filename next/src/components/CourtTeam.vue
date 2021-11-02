<template>
    <div class="w-full p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <court-team-card v-for="(a_team, index) in this.mockTeams" :teamMembers="a_team" :key="index"/>
            <court-new-team-card/>
        </div>
    </div>
</template>

<script>
import CourtTeamCard from "./CourtTeamCard.vue"
import CourtNewTeamCard from "./CourtNewTeamCard.vue"

export default {
    name: "CourtTeam",
    components: {
        CourtTeamCard,
        CourtNewTeamCard
    },

    props: {}, // Props should take in court data later on

    data() {
        return {
            mockTeams: [
                // mockid : userinfo
                [
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
                ],
                [
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
            ]
        }
    }

}
</script>

<style>

</style>