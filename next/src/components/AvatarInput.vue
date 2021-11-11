<template>
    <div>
        <input type="file" accept="image/*" class="hidden" ref="file" @change="change"> 
        <div class="relative inline-block"> 
            <img v-if="src" :src="src" alt="Avatar" class="h-24 rounded-full object-cover">
            <img v-else :src="defaultSrc" alt="Avatar" class="h-24 rounded-full object-cover">
            <div class="absolute top-0 h-full w-full bg-opacity-25 flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-50 opacity-0 hover:opacity-100">
                <!-- <div class="opacity-0 hover:opacity-100"> -->
                <button @click.prevent="browse()" class="rounded-full hover:bg-white hover:bg-opacity-50 p-2 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" 
                    stroke-linejoin="round"><g transform="translate(2 3)"><path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z"/><circle cx="10" cy="10" r="4"/></g></svg>
                </button>
                <button v-if="src" @click.prevent="remove()" class="rounded-full hover:bg-white hover:bg-opacity-50 p-2 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" 
                    stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <!-- </div> -->
            </div>
        </div>   
    </div>
</template>


<script>

import "firebase/compat/storage";
import firebase from 'firebase/compat/app';

export default {
    name: 'AvatarInput',
    props: ["value"],
    data(){
        return{
            src: this.value,
            file: this.$store.state.ProfileImg,
            defaultSrc: this.$store.state.profileInitialsURL,
        }
    },

    methods:{
        browse(){
            this.$refs.file.click()
        },
        remove(){
            this.file = null;
            this.src = this.defaultSrc
            this.$emit('input', this.file)
            const userID = this.$store.state.profileID

            firebase.firestore().collection("users").doc(userID).update({profileImg: null})
            this.$store.commit("changeProfileImg", null) 

        },

        change(e) {
            this.file = e.target.files[0];
            this.$emit('input',e.target.files[0]);
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                this.src = e.target.result;
            }

            const userID = this.$store.state.profileID
            console.log(userID);
            const filename = this.file.name
            const ext = filename.slice(filename.lastIndexOf("."))
            let upload = firebase.storage().ref("users/" + userID + "." + ext).put(this.file);
            upload.on('state_changed', (snapshot) => {console.log(snapshot);},
            (error) => {console.log(error);}, ()=> {
                upload.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                    this.$store.commit("changeProfileImg",downloadURL)
                    console.log(downloadURL);
                    return firebase.firestore().collection("users").doc(userID).update({profileImg: downloadURL})
                })
                
            })
        
    },
    
    }
}
</script>
