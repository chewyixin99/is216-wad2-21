<template>
    
<div class="container mx-auto px-6">
  <form>
    <!-- FIRST AND LAST NAMES (TO CALL FROM SIGN UP PAGE) -->
    <div class="bg-white shadow-md rounded px-8 py-6 my-6">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="postalcode">
                Postal Code
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="postalcode" type="text" v-model="postalcode">
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="hp">
                HP No.
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hp" type="text" v-model="hp">
            </div>
        </div>

      
        <!-- EXPERIENCE -->
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="experience">
            Experience
        </label>
        <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="age" type="text" name="age" v-model="age"> -->
        <select class="form-select mt-1 block w-full shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="experience" name="experience" v-model="experience">
            <option>Recreational</option>
            <option>Intermediate</option>
            <option>Competitive</option>
        </select>
        </div>

        <!-- FAVOURITE PLAYER -->
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="favPlayer">
            Favourite Player
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favPlayer" type="text" name="favPlayer" v-model="favPlayer">
        </div>

        <!-- FAVOURITE TEAM -->
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="favTeam">
            Favourite Teams
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favTeam" type="text" name="favTeam" v-model="favTeam">
        </div>

    </div>

    <div class="text-center mb-4">
        <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-64" @click.prevent="onboarding">
        Let's Play
        </button>
    </div>
    

  </form>


</div>

</template>

<script>


import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "../firebase/firebaseInit";


export default {
    name: "Onboarding",
data(){
    return{
        experience: this.experience,
        favTeam: "",
        favPlayer: "",
        postalcode: "",
        hp: "",
        errorMsg : "",
        error: null,

    }
},
    methods:{
        onboarding(){
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const dataBase = db.collection("users").doc(uid);
                this.$router.replace({name: "Home"});
                dataBase.set({
                    experience: this.experience,
                    favPlayer: this.favPlayer,
                    favTeam: this.favTeam,
                    postalcode: this.postalcode,
                    hp: this.hp,
                });
            } 
        })
        }
    },

}
    


// methods:{
//   async onboarding() {
//       if (
//         this.email !== "" && 
//         this.password !== "" &&
//         this.firstName !== "" &&
//         this.lastName !== "" 
//       ) {
//         this.error = false;
//         this.errorMsg = "";
//         // const firebaseAuth = await firebase.auth();
//         // const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
//         // const result = await createUser;
//         // const dataBase = db.collection("users").doc(result.user.uid);
//         // this.$router.replace({name: "Home"});
//         // await dataBase.set({
//         //   firstName: this.firstName,
//         //   lastName: this.lastName,
//         //   email: this.email,
//         // });
//         const abc = useAuthState()
//         console.log(abc);
       

              
//     }

//     this.error = true;
//     this.errorMsg = "Please fill out all the fields!";
//     }
// }


</script>
