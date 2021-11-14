<template>
    <div class="container max-w-5xl mx-auto">
        <div class="flex justify-center mt-5 mx-6">
            <img src="../assets/nextlogo2.png" width="500">
        </div>
    
        <!-- ABOUT TEXT -->
        <div class="mt-5 px-6">
            <p class="text-center text-lg font-medium text-white leading-8">
            Different basketball players go to the basketball courts with different objectives. Some are eager to compete, seeking crowded courts filled with competition, while others go just to let off some steam. Since there are a limited number of basketball courts, players will need to either share the courts or join a pickup game. However, there are currently no reliable avenues to facilitate this. As a result, it is a common sight to see players heading down to multiple basketball courts to check the availability of games and courts. Our project, Next, aims to organise this fragmented network of basketball games in Singapore to help users better visualise the availability of courts/games and reduce wasted time.
            </p>
        </div>

        <!-- FOUNDERS -->
        <div class="mt-5 px-6 text-center w-max mx-auto">
            <div class="text-white">
                <h1 class="text-center text-3xl font-extrabold">
                    ABOUT US
                </h1>
                <p class="text-lg font-medium italic">
                    (P.S. Click on our faces to view our profiles on NEXT!)
                </p>
            </div>
        </div>
        
        <div class="my-7 px-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div class="col-span-1">
                    <div class="bg-yellow-400  font-medium p-3 text-center py-8 border-yellow-400 border-2 border-dashed rounded hover:text-white hover:bg-purple-900 hover:shadow-2xl transition-colors duration-200 ">
                        <div class="flex justify-center items-center">
                            <div>
                                <div class="flex justify-center mb-2 cursor-pointer" @click="toPublicUser(accountInfo[0])"> 
                                    <img 
                                    :src="typeof accountInfo[0].profileImg === 'undefined' ? $store.state.defaultProfileImg : accountInfo[0].profileImg" 
                                    class="rounded-full object-cover h-24 w-24 flex items-center justify-center"
                                    >
                                </div>

                                <h1 class="text-3xl mt-3">Loh Kok Wee</h1> 
                                <p class="text-md">"BALL IS LIFE"</p>

                                <p class="text-md mt-3">Aspiring ML Engineer, hobbyist programmer and avid baller.</p>

                                <div class="mt-3"> 
                              <div class="grid grid-cols-3 gap-3">
                                        <a href="https://github.com/lohkokwee" target="_blank"><img src="../assets/linkedin.svg" class="w-10 mx-auto" alt=""></a>
                                        <a href="https://www.linkedin.com/in/loh-kok-wee-59a698142/" target="_blank"><img src="../assets/github.svg" class="w-10 mx-auto" alt=""></a>
                                        <a href="https://www.instagram.com/koksterrr/" target="_blank"><img src="../assets/instagram.svg" class="w-10 mx-auto" alt=""></a> 
                              </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="bg-yellow-400  font-medium p-3 text-center py-8 border-yellow-400 border-2 border-dashed rounded hover:text-white hover:bg-purple-900 hover:shadow-2xl transition-colors duration-200 ">
                        <div class="flex justify-center items-center">
                            <div>
                                <div class="flex justify-center mb-2 cursor-pointer" @click="toPublicUser(accountInfo[1])"> 
                                    <img 
                                    :src="typeof accountInfo[1].profileImg === 'undefined' ? $store.state.defaultProfileImg : accountInfo[1].profileImg" 
                                    class="rounded-full object-cover h-24 w-24 flex items-center justify-center"
                                    >
                                </div>

                                <h1 class="text-3xl mt-3">Loh Kok Wee</h1> 
                                <p class="text-md">"BALL IS LIFE"</p>

                                <p class="text-md mt-3">Aspiring ML Engineer, hobbyist programmer and avid baller.</p>

                                <div class="mt-3"> 
                              <div class="grid grid-cols-3 gap-3">
                                        <a href="https://github.com/lohkokwee" target="_blank"><img src="../assets/linkedin.svg" class="w-10 mx-auto" alt=""></a>
                                        <a href="https://www.linkedin.com/in/loh-kok-wee-59a698142/" target="_blank"><img src="../assets/github.svg" class="w-10 mx-auto" alt=""></a>
                                        <a href="https://www.instagram.com/koksterrr/" target="_blank"><img src="../assets/instagram.svg" class="w-10 mx-auto" alt=""></a> 
                              </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="bg-yellow-400  font-medium p-3 text-center py-8 border-yellow-400 border-2 border-dashed rounded hover:text-white hover:bg-purple-900 hover:shadow-2xl transition-colors duration-200 ">
                        <div class="flex justify-center items-center">
                            <div>
                                <div class="flex justify-center mb-2 cursor-pointer" @click="toPublicUser(accountInfo[2])"> 
                                    <img 
                                    :src="typeof accountInfo[2].profileImg === 'undefined' ? $store.state.defaultProfileImg : accountInfo[2].profileImg" 
                                    class="rounded-full object-cover h-24 w-24 flex items-center justify-center"
                                    >
                                </div>

                                <h1 class="text-3xl mt-3">Loh Kok Wee</h1> 
                                <p class="text-md">"BALL IS LIFE"</p>

                                <p class="text-md mt-3">Aspiring ML Engineer, hobbyist programmer and avid baller.</p>

                                <div class="mt-3"> 
                              <div class="grid grid-cols-3 gap-3">
                                        <a href="https://github.com/lohkokwee" target="_blank"><img src="../assets/linkedin.svg" class="w-10 mx-auto" alt=""></a>
                                        <a href="https://www.linkedin.com/in/loh-kok-wee-59a698142/" target="_blank"><img src="../assets/github.svg" class="w-10 mx-auto" alt=""></a>
                                        <a href="https://www.instagram.com/koksterrr/" target="_blank"><img src="../assets/instagram.svg" class="w-10 mx-auto" alt=""></a> 
                              </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="bg-yellow-400  font-medium p-3 text-center py-8 border-yellow-400 border-2 border-dashed rounded hover:text-white hover:bg-purple-900 hover:shadow-2xl transition-colors duration-200 ">
                        <div class="flex justify-center items-center">
                            <div>
                                <div class="flex justify-center mb-2 cursor-pointer" @click="toPublicUser(accountInfo[3])"> 
                                    <img 
                                    :src="typeof accountInfo[3].profileImg === 'undefined' ? $store.state.defaultProfileImg : accountInfo[3].profileImg" 
                                    class="rounded-full object-cover h-24 w-24 flex items-center justify-center"
                                    >
                                </div>

                                <h1 class="text-3xl mt-3">Loh Kok Wee</h1> 
                                <p class="text-md">"BALL IS LIFE"</p>

                                <p class="text-md mt-3">Aspiring ML Engineer, hobbyist programmer and avid baller.</p>

                                <div class="mt-3"> 
                              <div class="grid grid-cols-3 gap-3">
                                        <a href="https://github.com/lohkokwee" target="_blank"><img src="../assets/linkedin.svg" class="w-10 mx-auto" alt=""></a>
                                        <a href="https://www.linkedin.com/in/loh-kok-wee-59a698142/" target="_blank"><img src="../assets/github.svg" class="w-10 mx-auto" alt=""></a>
                                        <a href="https://www.instagram.com/koksterrr/" target="_blank"><img src="../assets/instagram.svg" class="w-10 mx-auto" alt=""></a> 
                              </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                








            </div>
        </div>

        
    </div>

    

</template>

<script>

import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

export default {
    data () {
        return {
            // Our accounts
            accountIDs: [ "yI7Mez9EfMdlG8lDyBviXM1pbEA3" 
                // {
                //     firstName: "Kok Wee",
                //     lastName: "Loh",
                //     experience: "Recreational",
                //     email: "lohkokwee@gmail.com",
                //     favPlayer: "Zach LaVine",
                //     favTeam: "",
                //     profileImg: docRef.data().profileImg,
                //     groupID: docRef.data().groupID,
                //     profileID: "yI7Mez9EfMdlG8lDyBviXM1pbEA3" 
                // }
            ],

            accountInfo : [{}, {}, {}, {}]


        }
    },
    created() {
        firebase
        .firestore()
        .collection("users")
        .where(firebase.firestore.FieldPath.documentId(), 'in', this.accountIDs)
        .get()
        .then((userDocs) => {
            let counter = 0

            userDocs.forEach((userDoc) => {

                let memberObj = {
                    firstName: userDoc.data().firstName,
                    lastName: userDoc.data().lastName,
                    experience: userDoc.data().experience,
                    email: userDoc.data().email,
                    favPlayer: userDoc.data().favPlayer,
                    favTeam: userDoc.data().favTeam,
                    profileImg: userDoc.data().profileImg,
                    groupID: userDoc.data().groupID,
                    profileID: this.accountIDs[counter]

                }

                console.log(memberObj.profileImg);

                this.accountInfo[counter] = memberObj
            })

            counter += 1


        })
        .then(()=>{
            // console.log(profileImg);
        }).catch(e => console.log(`about.vue error: ${e}`))


    },

    methods: {
        toPublicUser(payload){
            this.$router.replace({name: "PublicUser"});
            this.$store.commit('setPublicUserUpdated', false)
            this.$store.commit('updateSelectedProfile', payload)
            this.$store.dispatch('populatePublicUserGroupDetails', payload.groupID)
        },
    }
}
</script>

<style>

</style>
