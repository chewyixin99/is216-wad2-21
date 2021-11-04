<template>
<div class="container max-w-md mx-auto">
    <!-- HEADER -->
    <div class="secondary-gold-title text-center mt-6 mb-3 justify-items-center">
        Temporary Group Creating Page
    </div>

    <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <form>
            <!-- EMAIL INPUT -->
            <div class="mb-6">
                <label class="block text-white text-sm font-bold mb-2" for="groupname">
                    ENTER GROUP NAME
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="groupname" type="text" v-model="groupname">
            </div>

            <div class="mb-6">
                <label class="block text-white text-sm font-bold mb-2" for="groupname">
                    AGE GROUP
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="groupname" type="text" v-model="agegroup">
            </div>

            <div class="mb-6">
                <label class="block text-white text-sm font-bold mb-2" for="groupname">
                    SKILL LEVEL
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="groupname" type="text" v-model="skilllevel">
            </div>

            <div class="mb-6">
                <label class="block text-white text-sm font-bold mb-2" for="groupname">
                    NOTES
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="groupname" type="textbox" v-model="notes">
            </div>


            <!-- SUBMIT BUTTON -->
            <div class="text-center">
                <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-36" @click.prevent="toProfile(); createGroup()">
                SUBMIT
            </button>
            
            </div>
        </form>
    </div>
</div>
</template>

<!-- https://v1.tailwindcss.com/components/forms -->


<script>
import { getAuth } from "firebase/auth";
import db from "../firebase/firebaseInit";
import firebase from 'firebase/compat/app';
// import { updateDoc, arrayUnion } from "firebase/firestore";
// import { ref } from "vue"

export default {
    name: 'CreateGroup',
    data(){
        return {
            groupname: "uaena",
            agegroup: "uaena",
            skilllevel: "uaena",
            notes: "uaena",
            firstName: "",
            lastName: "",
            fullName: "",
            

        }
        
    },
    
    created() {
            
            const auth = getAuth()
            const userInfo = auth.currentUser
            const uid = userInfo.uid
            this.retrieved_uid = uid

            firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((docRef) => {
                this.firstName = docRef.data().firstName
                this.lastName = docRef.data().lastName
            })
        },
        
    methods: {
        createGroup(){
            
            this.fullName = this.firstName + " " + this.lastName

            console.log(this.fullName);
            db.collection("groups").add({
                groupMembers: [this.retrieved_uid],
                groupName: this.groupname,
                Notes: this.notes,
            }).then(function(docRef){
                
                const groupIDstr = docRef.id
                const auth1 = getAuth()
                const userInfo1 = auth1.currentUser
                const uid1 = userInfo1.uid

                db.collection("users").doc(uid1).get().then((docRef1) => {
                    const groupIDObj = docRef1.data().groupID
                    const compilation = [];
                    for (var i = 0; i < groupIDObj.length; i++){
                        compilation.push(groupIDObj[i])
                    }
                    compilation.push(groupIDstr)
                    db.collection("users").doc(uid1).update({
                        groupID: compilation
                    });
                });

            }).catch(function(error){
                console.log(error);
            });
            
          
               

            // const docRef = db.collection("users").doc(this.retrieved_uid);


            // docRef.get().then(function (thisDoc){
            //     if (thisDoc.exists){
            //         let groupID12 = createGroupDoc.id;
            //         docRef.update(groupID12)
            //         console.log("updated");
            //     }
            // })

        },
        toProfile(){
          this.$router.replace({name: "Profile"});
          console.log("MOVE");
        },
    }

    
};
</script>