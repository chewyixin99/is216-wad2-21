<template>

    <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-3 mx-6 text-center">
        <div class="grid grid-cols-4">
            <div class="border h-20 col-span-4 md:col-span-1">
                INSERT GROUP NAME HERE
            </div>
            <div class="border col-span-4 md:col-span-3">
                INSERT GROUP MEMBERS HERE
            </div>
        </div>
    </div>

</template>

<script>
// import TheProfileIcon from "./TheProfileIcon.vue"

export default {
    name: "TheGroup",
    // components: {
    //     TheProfileIcon
    // },
    props: {}, // Props should take in array of current players later on


    data() {
        return {
            groupMembers: [
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
        ]
        }
    }
}
</script>