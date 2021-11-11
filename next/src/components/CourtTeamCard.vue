<!-- 
--- Court Team Cards ---
Team cards take in a single team's info and populates the card.
Team card spans the entire width of its container, so it requries container divs to format responsiveness.

Example Implementation: 
<div class="w-full">
    <div class="mx-auto px-4 py-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <court-card/>
        </div>
    </div>
</div>
-->

<template>
    <div class="w-full bg-gray-800 rounded-lg p-4">
        <div>
            <div class="text-center mb-5">
                <p class="text-2xl text-yellow-500 font-bold">TEAM 1</p>
            </div>

            <div class="font-bold flex items-center m-3">
                <the-profile-icon initials="BL" imgSrc=""/>
                <div class="text-white text-center ml-5">USERNAME</div>
            </div>
            <div class="font-bold flex items-center m-3">
                <the-profile-icon initials="BL" imgSrc=""/>
                <div class="text-white text-center ml-5">USERNAME</div>
            </div>
            <div class="font-bold flex items-center m-3">
                <the-profile-icon initials="BL" imgSrc=""/>
                <div class="text-white text-center ml-5">USERNAME</div>
            </div>
        </div>

        <div class="mt-6">
            <the-button class="bg-yellow-500 text-white" button-type="form-full">
                <slot>JOIN</slot>
            </the-button>
        </div>
    </div>

</template>

<script>
import TheButton from './TheButton.vue'
import TheProfileIcon from './TheProfileIcon.vue'


export default {
    name: "CourtTeamCard",
    components: { 
        TheProfileIcon,
        TheButton    
    },
    props: {
        teamMembers: {type: Object}
    }

}
</script>

        TheButton
<style>

</style>