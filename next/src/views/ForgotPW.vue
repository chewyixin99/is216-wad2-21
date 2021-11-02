<template>
<div class="container max-w-md mx-auto">
    <!-- HEADER -->
    <div class="secondary-gold-title text-center mt-6 mb-3 justify-items-center">
        Password Reset
    </div>

    <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="text-white mb-4">
            Enter your email address and we'll send you a link to reset your password.
        </div>

        <hr class="mb-4">

        <form>
            <!-- EMAIL INPUT -->
            <div class="mb-6">
                <label class="block text-white text-sm font-bold mb-2" for="email" >
                    ENTER EMAIL 
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="email">
            </div>
            <!-- SUBMIT BUTTON -->
            <div class="text-center">
                <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-36" @click.prevent="reset">
                SUBMIT
            </button>
            
            </div>
        </form>
    </div>
</div>
</template>

<!-- https://v1.tailwindcss.com/components/forms -->


<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {

    methods: {

        reset() {
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email)
            .then(() => {
                console.log("Email sent");
            })
            .catch((error) => {
                alert(error)
            });
        },
        toLogin(){
          this.$router.replace({name: "LogIn"});
        },
    }

    
};
</script>