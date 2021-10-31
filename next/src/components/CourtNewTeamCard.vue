<!-- 
--- New Team Cards ---

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
    <div class="w-full bg-gray-700 rounded-lg border-dashed border-4 border-gray-900 p-10 flex flex-col justify-between items-center">
        <div class="text-center mb-10">
            <p class="text-2xl text-yellow-500 font-bold">CREATE NEW TEAM</p>
        </div>

        <div class="my-5">
            <the-button class="text-2xl text-center text-gray-700 bg-yellow-500 " button-type="add" button-name="+"/>
        </div>

        <div class="mb-10">
            <!-- For flexbox's space between -->
            &nbsp;
        </div>
    </div>

</template>

<script>
import TheButton from './TheButton.vue'

export default {
    name: "CourtNewTeamCard",
    components: { 
        TheButton    
    },

}
</script>

        TheButton
<style>

</style>