
<!-- THIS PAGE NOT DONE YET **************** -->



<template>
<div class="w-full max-w-xs">
    <div class="px-8 pt-6 text-gray-700 text-lg font-bold mb-2 justify-items-center">Reset Password</div>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Enter valid email address to reset 
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="email">
        </div>
        <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
            Submit
        </button>
        
        </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
        &copy;Project Next. All rights reserved.
    </p>
</div>
</template>

<!-- https://v1.tailwindcss.com/components/forms -->

<script>

export default {
    name: "Login",

    data() {
        return {
            email: null,
            password: null,

        };
     },

    
};
</script>