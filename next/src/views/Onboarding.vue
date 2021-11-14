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

                            <select class="form-select block w-full shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="experience" name="experience" v-model="experience">
                                <option>Recreational</option>
                                <option>Intermediate</option>
                                <option>Competitive</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <!-- FAVOURITE PLAYER -->
                            <div>
                                <label class="block text-white text-sm font-bold mb-2" for="favPlayer">
                                    FAVOURITE PLAYER
                                </label>
                                <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favPlayer" type="text" name="favPlayer" v-model="favPlayer" placeholder="Favourite Players"> -->
                                <fav-player @emitFavPlayer="favPlayerUpdate($event)"/>
                            </div>
                            <!-- <fav-player/> -->

                            <!-- FAVOURITE TEAM -->                        
                            <div>
                                <label class="block text-white text-sm font-bold mb-2" for="favTeam">
                                    FAVOURITE TEAM
                                </label>
                                <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favTeam" type="text" name="favTeam" v-model="favTeam" placeholder="Favourite Teams"> -->
                                <fav-team @emitFavTeam="favTeamUpdate($event)"/>
                            </div> 
                            <!-- <fav-team/> -->
                        </div>
                       

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
            
            favPlayer: "",
            favTeam: "",

        }
    },

    methods:{

        update(){

            this.$store.state.profileFavPlayer = this.favPlayer
            this.$store.state.profileFavTeam = this.favTeam
            this.$store.dispatch("updateUserSettings");

        },

        toHome(){

            this.$router.replace({name: "Home"});

        },

        favTeamUpdate(input){

            this.favTeam= input


        },

        favPlayerUpdate(input){

            this.favPlayer = input

        }
     
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
         
    },

    mounted() {
        if (localStorage.getItem('reloaded')) {
            localStorage.removeItem('reloaded');
        } else {
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
    }
   

}



</script>