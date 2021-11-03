<template>
    <div>
        <!-- Minimap -->
        <div>
            <court-mini-map/>
        </div>

        <!-- Check In -->
        <div class="my-4">
            <the-button class="bg-yellow-500 text-white" buttonType="form-full">
                CHECK IN
            </the-button>
        </div>

        <!-- Check Out -->
        <div class="my-4">
            <the-button class="bg-white" buttonType="form-full">
                CHECK OUT
            </the-button>
        </div>

        <!-- Bookmark -->
        <div class="my-4">
            <the-button class="bg-gray-900 text-white" buttonType="form-full">
                BOOKMARK
            </the-button>
        </div>
    </div>
</template>

<script>
import TheButton from "./TheButton.vue"
import CourtMiniMap from "./CourtMiniMap.vue"

export default {
    name: "CourtMiniMapSection",
    components: { TheButton, CourtMiniMap }
}
</script>

<style>

</style>