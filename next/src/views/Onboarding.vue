<template>

    <div class="container max-w-3xl mx-auto">

        <div class="grid grid-cols-1 mx-6">
            <form>
                <div class="bg-gray-800 shadow-md rounded px-8 py-6 my-6">
                    
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
                        <div class="mb-4">
                            <label class="block text-white text-sm font-bold mb-2" for="favPlayer">
                                FAVOURITE PLAYERS
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favPlayer" type="text" name="favPlayer" v-model="favPlayer" placeholder="Favourite Players">

                        </div>

                        <!-- FAVOURITE TEAM -->
                        <div class="mb-4">
                            <label class="block text-white text-sm font-bold mb-2" for="favTeam">
                                FAVOURITE TEAMS
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="favTeam" type="text" name="favTeam" v-model="favTeam" placeholder="Favourite Teams">

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

export default {

    name: "Onboarding",

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
        favPlayer: {

          get() {
            return this.$store.state.profileFavPlayer
            },

          set(payload) {
            this.$store.commit("changeFavPlayer", payload);
            },
        },
        favTeam: {

          get() {
            return this.$store.state.profileFavTeam
            },

          set(payload) {
            this.$store.commit("changeFavTeam", payload);
            },

        },  

        email: {

          get() {
            return this.$store.state.profileEmail
            },
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
       
    // created(){
        
    //     const auth = getAuth()
    //     const userInfo = auth.currentUser
    //     const uid = userInfo.uid
    //     this.email = userInfo.email

    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(uid)
    //       .get()
    //       .then((docRef) => {
    //         this.firstName = docRef.data().firstName
    //         this.lastName = docRef.data().lastName
    //       })
    //   },
              
//     }

//     this.error = true;
//     this.errorMsg = "Please fill out all the fields!";
//     }
// }

   // onboarding(){
        //     const auth = getAuth();
        //     onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         const uid = user.uid;
        //         const dataBase = db.collection("users").doc(uid);
        //         this.$router.replace({name: "Home"});
        //         dataBase.set({
        //             firstName: this.firstName,
        //             lastName: this.lastName,
        //             email: this.email,
        //             experience: this.experience,
        //             favPlayer: this.favPlayer,
        //             favTeam: this.favTeam,
        //             groupID: [],
        //             activeCourt: this.activeCourt,
        //             loggedInTime: 'whenever user logs in ',
        //             checkedInTime: 'whenever user checks in to active court. 2hrs later activeCourt = null'
        //         });
        //     } 
        // })
        // }

</script>