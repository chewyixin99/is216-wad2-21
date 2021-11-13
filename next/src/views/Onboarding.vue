<template>

    <div class="container max-w-3xl mx-auto">

        <div class="grid grid-cols-1 mx-6">
            <form>
                <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-6">
                    
                    <div class="profile-image flex justify-center items-center mb-4">
                        <avatar-input :value="img"/>
                        <!-- :default-src= profileInitialsURL -->
                    </div>

                        <!-- FIRST AND LAST NAME -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-white text-sm font-bold mb-2" for="firstName">
                                FIRST NAME
                                </label>
                                <input disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" v-model="firstName">
                            </div>
                            <div>
                                <label class="block text-white text-sm font-bold mb-2" for="lastName">
                                LAST NAME
                                </label>
                                <input disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" v-model="lastName">
                            </div>
                        </div>

                        <!-- EMAIL -->
                        <div class="mb-4">
                            <label class="block text-white text-sm font-bold mb-2" for="email">
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
                        <!-- <div class="mb-4">
                            <label class="block text-white text-sm font-bold mb-2" for="favPlayer">
                                FAVOURITE PLAYERS
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favPlayer" type="text" name="favPlayer" v-model="favPlayer" placeholder="Favourite Players">

                        </div> -->
                        <fav-player/>

                        <!-- FAVOURITE TEAM -->
                        <fav-team/>
                        <!--
                            <div class="mb-4">
                            <label class="block text-white text-sm font-bold mb-2" for="favTeam">
                                FAVOURITE TEAMS
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favTeam" type="text" name="favTeam" v-model="favTeam" placeholder="Favourite Teams">

                        </div> 
                        -->

                </div>

                <!-- SUBMIT BUTTON -->
                <div class="text-center mb-4">
                    <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-64" @click.prevent=" update() ; toHome() ">
                    SAVE
                    </button>
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

    name: "Onboarding",

    components: {
        AvatarInput,
        FavPlayer,
        FavTeam,
    },

    data(){
        return{
        }
    },

    methods:{

        update(){

            this.$store.dispatch("updateUserSettings");

        },

        toHome(){

            this.$router.replace({name: "Home"});

        },
     
    },

    computed: {

        firstName: {

          get() {
            return this.$store.state.profileFirstName
            },

          set(payload) {
            this.$store.commit("changeFirstName", payload);
            },

        },

        lastName: {
            
          get() {
            return this.$store.state.profileLastName
            },

          set(payload) {
            this.$store.commit("changeLastName", payload);
            },

        },
        experience: {

          get() {
            return this.$store.state.profileExperience
            },

          set(payload) {
            this.$store.commit("changeExperience", payload);
            },

        },
        // favPlayer: {

        //   get() {
        //     return this.$store.state.profileFavPlayer
        //     },

        //   set(payload) {
        //     this.$store.commit("changeFavPlayer", payload);
        //     },
        // },
        // favTeam: {

        //   get() {
        //     return this.$store.state.profileFavTeam
        //     },

        //   set(payload) {
        //     this.$store.commit("changeFavTeam", payload);
        //     },

        // },  

        email: {

          get() {
            return this.$store.state.profileEmail
            },
        },

        img: {

          get() {
            return this.$store.state.profileImg
            },

        },

        // initials: {

        //     set() {
        //         if (firstName != "" && lastName != ""){
        //             this.$store.commit("setProfileInitials");
        //         }
        //     },

        // },

        // initialsURL: {

        //     get() {
        //         return this.$store.state.profileInitialsURL
        //     },

        //     set() {
        //         if (initials){
        //             this.$store.commit("setProfileInitialsURL");
        //         }
        //     },

        // },

      
        
    },
   

}



</script>