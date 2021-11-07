<template>

    <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-6 mx-6">
        <div class="grid grid-cols-4">

            <!-- GROUP PROFILE -->
            <div class="col-span-4 md:col-span-1 text-center">
                <div class="profile-image flex justify-center items-center">
                    <img src="https://t3.ftcdn.net/jpg/04/55/75/46/240_F_455754611_8eowWGUS88rIH74lyLaEgAHim7XPc2Os.jpg" alt="">
                </div>
                <!-- DELETE BUTTON -->
                <div class="sm:space-x-4 md:space-x-0">
                    <!-- <button class="bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-bold py-2 px-4 rounded w-36 mt-3" @click="addMembers">
                        ADD MEMBER
                    </button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold font-bold py-2 px-4 rounded w-36 my-3" @click="leaveGroup">
                        LEAVE GROUP
                    </button> -->
                    <the-button :onClick="addMembers" class="bg-yellow-500 hover:bg-yellow-700 text-white mt-3" buttonType="form-sm">
                        ADD MEMBER
                    </the-button>
                    <the-button :onClick="leaveGroup" class="bg-red-500 hover:bg-red-700 text-white mt-3" buttonType="form-sm">
                        LEAVE GROUP
                    </the-button>
                </div>
            </div>
            
            <!-- GROUP MEMBERS -->
            <div class="col-span-4 md:col-span-3 mt-3">
                <!-- GROUP NAME -->
                <div class="flex flex-wrap justify-between">
                    <span class="secondary-gold-title">{{groupName.toUpperCase()}}</span>
                    <span class="secondary-white-title">{{groupExp.toUpperCase()}}</span>
                    <!-- <div class="rounded-full bg-gray-700 py-2 px-5 font-bold text-white">{{this.groupMembers.length}} P</div> -->
                </div>
                <!-- V-FOR GROUP MEMBERS -->
                <div class="grid grid-cols-5 md:grid-cols-10 gap-4 mt-3 justify-items-center">
                    <the-profile-icon :onClick="toPublicUser" v-for="(a_player, index) in this.groupMembers" :initials="a_player.initials" :key="index"
                    class="font-bold" />
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import TheProfileIcon from "./TheProfileIcon.vue"
import TheButton from "./TheButton.vue"

export default {
    name: "Group",
    components: {
        TheProfileIcon,
        TheButton,
    },
    props: {}, // Props should take in array of current players later on


    data() {
        return {
            groupName: "Support System",
            groupExp: "Recreational",
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
                },
        ]
        }
    },

    methods:{

    addMembers(){
        var member = prompt("Enter email")
        return member
    },
    leaveGroup(){
        alert ("Are you sure you want to leave this group?")
    },
    toPublicUser(){
        this.$router.replace({name: "PublicUser"});
      },

    },
}
</script>