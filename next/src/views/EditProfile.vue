<template>

    <div class="container max-w-3xl mx-auto">

        <div class="bg-gray-800 shadow-md rounded px-8 py-6 m-6">
            <form>
                <div>
                    <div class="profile-image flex justify-center items-center mb-4">
                        <avatar-input :value="profileImg"/>
                        <!-- :default-src= profileInitialsURL -->
                    </div>
                    <!-- FIRST AND LAST NAME -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-white text-sm font-bold mb-2" for="firstName">
                            FIRST NAME
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" v-model="firstName">
                        </div>
                        <div>
                            <label class="block text-white text-sm font-bold mb-2" for="lastName">
                            LAST NAME
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" v-model="lastName">
                        </div>
                    </div>

                    <!-- EMAIL -->
                    <div class="mb-4">
                        <label class="block text-white text-sm font-bold" for="email">
                            EMAIL
                        </label>
                        <input disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name="email" v-model="email">
                    </div>

                    <!-- EXPERIENCE -->
                    <div class="mb-4">
                        <label class="block text-white text-sm font-bold mb-2" for="experience">
                            EXPERIENCE
                        </label>

                        <select class="form-select mt-1 block w-full shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="experience" name="experience" v-model="experience">
                            <option>Recreational</option>
                            <option>Intermediate</option>
                            <option>Competitive</option>
                        </select>
                    </div>

                    <!-- FAVOURITE PLAYER -->
                     <!-- <div class="mb-6">
                        <label class="block text-white text-sm font-bold mb-2" for="favPlayer">
                            FAVOURITE PLAYER
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favPlayer" type="text" name="favPlayer" v-model="favPlayer">
                    </div> -->
                    <FavPlayer/>

                    <!-- FAVOURITE TEAM -->
                    <!-- <div class="mb-6">
                        <label class="block text-white text-sm font-bold mb-2" for="favTeam">
                            FAVOURITE TEAMS
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favTeam" type="text" name="favTeam" v-model="favTeam">
                    </div> -->
                    <FavTeam/>

                    <!-- BUTTONS -->
                    <div class="mt-3 text-center space-x-4">
                        <!-- BACK BUTTON -->
                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-28 sm:w-48" @click.prevent="toProfile">
                            CANCEL
                            </button>
                        <!-- UPDATE BUTTON -->
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-28 sm:w-48" @click.prevent="update(); toProfile()">
                            UPDATE
                            </button>
                        
                    </div>

                </div>

            </form>
        </div>
    
    </div>

</template>

<script>

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import AvatarInput from '../components/AvatarInput.vue';
import FavPlayer from '../components/FavPlayer.vue';
import FavTeam from '../components/FavTeam.vue';


export default {

    name: "EditProfile",

    components: {
        AvatarInput,
        FavPlayer,
        FavTeam,
    },

    data(){
        return{
            profileImg: this.$store.state.profileImg,
            firstName: this.$store.state.profileFirstName,
            lastName: this.$store.state.profileLastName,
            experience: this.$store.state.profileExperience,
            favPlayer: this.$store.state.profileFavPlayer,
            favTeam: this.$store.state.profileFavTeam,
            email: this.$store.state.profileEmail,
        }
    },
    methods:{
        
        // CHANGE FIRESTORE DOCUMENT INFORMATION 
        update(){
            console.log(this.favPlayer);
            this.$store.state.profileFirstName = this.firstName
            this.$store.state.profileLastName = this.lastName
            this.$store.state.profileExperience = this.experience
            this.$store.state.profileFavPlayer = this.favPlayer
            this.$store.state.profileFavTeam = this.favTeam
            this.$store.dispatch("updateUserSettings");

        },

        // ROUTE BACK TO PROFILE
        toProfile(){
          this.$router.replace({name: "Profile"});
        },

    },
}
</script>