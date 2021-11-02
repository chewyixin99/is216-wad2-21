<template>

    <div class="container max-w-3xl mx-auto">

        <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-6">
            <form>
                <div>
                    
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
                    <div class="mb-4">
                        <label class="block text-white text-sm font-bold mb-2" for="favPlayer">
                            FAVOURITE PLAYERS
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favPlayer" type="text" name="favPlayer" v-model="favPlayer">
                    </div>

                    <!-- FAVOURITE TEAM -->
                    <div class="mb-6">
                        <label class="block text-white text-sm font-bold mb-2" for="favTeam">
                            FAVOURITE TEAMS
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favTeam" type="text" name="favTeam" v-model="favTeam">
                    </div>

                    <!-- BUTTONS -->
                    <div class="text-center space-x-4">
                        <!-- BACK BUTTON -->
                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-36 sm:w-64" @click.prevent="toProfile">
                            CANCEL
                            </button>
                        <!-- UPDATE BUTTON -->
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-36 sm:w-64" @click.prevent="update(); toProfile()">
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
import { getAuth } from "firebase/auth";
import db from "../firebase/firebaseInit";
import firebase from 'firebase/compat/app';


export default {
    name: "EditProfile",
    data(){
        return{
                    
            firstName: "",
            lastName: "",
            experience: "",
            favTeam: "",
            favPlayer: "",
            uid: "",
            errorMsg : "",
            error: null,

        }
    },
    methods:{
        
        // CHANGE FIRESTORE DOCUMENT INFORMATION
        update(){

            const dataBase = db.collection("users").doc(this.uid);
            this.$router.replace({name: "Home"});
            dataBase.set({
                firstName: this.firstName,
                lastName: this.lastName,
                experience: this.experience,
                favPlayer: this.favPlayer,
                favTeam: this.favTeam,
            })

        },
        // ROUTE BACK TO PROFILE
        toProfile(){
          this.$router.replace({name: "Profile"});
        },
    },
        // RETRIEVE DOCUMENT INFORMATION
        created() {

            const auth = getAuth()
            const userInfo = auth.currentUser
            const uid = userInfo.uid
            this.uid = uid
            firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((docRef) => {
                this.firstName = docRef.data().firstName
                this.lastName = docRef.data().lastName
                this.experience = docRef.data().experience
                this.favTeam = docRef.data().favTeam
                this.favPlayer = docRef.data().favPlayer
            })
        }

}
</script>