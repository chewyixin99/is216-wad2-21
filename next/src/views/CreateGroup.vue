<template>


    <div class="container max-w-3xl mx-auto">


        <div class="bg-gray-800 shadow-md rounded px-8 py-6 m-6">
            <form>
                <div>


                    <!-- GROUP NAME -->
                    <div class="mb-4">
                        <label class="block text-white text-sm font-bold mb-2" for="groupName">
                            GROUP NAME
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="groupName" type="text" name="groupName" v-model="newGroupName" maxlength="15">
                    </div>

                    <!-- EXPERIENCE -->
                    <div class="mb-4">
                        <label class="block text-white text-sm font-bold mb-2" for="groupExp">
                            EXPERIENCE
                        </label>

                        <select class="form-select mt-1 block w-full shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="groupExp" name="groupExp" v-model="newGroupExp">
                            <option>Recreational</option>
                            <option>Intermediate</option>
                            <option>Competitive</option>
                        </select>
                    </div>

                    <!-- BUTTONS -->
                    <div class="text-center space-x-4">
                        <!-- BACK BUTTON -->
                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-28 sm:w-48" @click.prevent="toGroups">
                            CANCEL
                            </button>
                        <!-- UPDATE BUTTON -->
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-28 sm:w-48" @click.prevent="update(); toGroups()">
                            CREATE
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
// import { getAuth } from "firebase/auth";
// import db from "../firebase/firebaseInit";
// import firebase from 'firebase/compat/app';


export default {
    name: "CreateGroups",
    data(){

        return{

            errorMsg : "",
            error: null,

        }
    },
    methods:{

        toGroups(){

          this.$router.replace({name: "Groups"});

        },

        update(){

            this.$store.dispatch("addNewGroup");


        },

    },

    computed: {

        newGroupName: {

            set(payload) {
                this.$store.commit("newGroupName", payload);
            },

        },

        newGroupExp: {

            set(payload) {
                this.$store.commit("newGroupExp", payload);
            },

        }

    }
    
}
</script>

<!--
    //     // !!! IMPORTANT: UNABLE TO PUSH NEW DATA, IT WILL REPLACE BECAUSE OF SET
    //     // CHANGE FIRESTORE DOCUMENT INFORMATION
    //     update(){

    //         const dataBase = db.collection("users").doc(this.uid);
    //         this.$router.replace({name: "Groups"});
    //         dataBase.set({
    //             groupName: this.groupName,
    //             groupExp: this.groupExp,
    //         })

    //     },
    //     // ROUTE BACK TO GROUPS

    // },
    //     // RETRIEVE DOCUMENT INFORMATION
    //     created() {

    //         const auth = getAuth()
    //         const userInfo = auth.currentUser
    //         const uid = userInfo.uid
    //         this.uid = uid

    //         firebase
    //         .firestore()
    //         .collection("users")
    //         .doc(uid)
    //         .get()
    //         .then((docRef) => {

    //             this.firstName = docRef.data().firstName
    //             this.lastName = docRef.data().lastName
    //         })
    //     },
        
    // methods: {
    //     createGroup(){
            
    //         this.fullName = this.firstName + " " + this.lastName

    //         console.log(this.fullName);
    //         db.collection("groups").add({
    //             groupMembers: [this.retrieved_uid],
    //             groupName: this.groupname,
    //             Notes: this.notes,
    //         }).then(function(docRef){
                
    //             const groupIDstr = docRef.id
    //             const auth1 = getAuth()
    //             const userInfo1 = auth1.currentUser
    //             const uid1 = userInfo1.uid

    //             db.collection("users").doc(uid1).get().then((docRef1) => {
    //                 const groupIDObj = docRef1.data().groupID
    //                 const compilation = [];
    //                 for (var i = 0; i < groupIDObj.length; i++){
    //                     compilation.push(groupIDObj[i])
    //                 }
    //                 compilation.push(groupIDstr)
    //                 db.collection("users").doc(uid1).update({
    //                     groupID: compilation
    //                 });
    //             });

    //         }).catch(function(error){
    //             console.log(error);
    //         });
            
          
               

            // const docRef = db.collection("users").doc(this.retrieved_uid);


            // docRef.get().then(function (thisDoc){
            //     if (thisDoc.exists){
            //         let groupID12 = createGroupDoc.id;
            //         docRef.update(groupID12)
            //         console.log("updated");
            //     }
            // })

//         },
//         toProfile(){
//           this.$router.replace({name: "Profile"});
//           console.log("MOVE");
//         },
//     }

    
// };

                // this.groups = docRef.data().groups
            // })
        // }

// }
-->