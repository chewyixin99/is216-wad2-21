<template>
    
<div class="container mx-auto px-6">
  <form>
    <!-- FIRST AND LAST NAMES (TO CALL FROM SIGN UP PAGE) -->
    <div class="bg-white shadow-md rounded px-8 py-6 my-6">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">
                First Name
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" v-model="firstName">
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">
                Last Name
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" v-model="lastName">
            </div>
        </div>

        <!-- EMAIL (TO CALL FROM SIGN UP PAGE) -->
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name="email" v-model="email">
        </div>

        <!-- EXPERIENCE -->
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="experience">
            Experience
        </label>
        <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="age" type="text" name="age" v-model="age"> -->
        <select class="form-select mt-1 block w-full shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="experience" name="experience">
            <option>Recreational</option>
            <option>Intermediate</option>
            <option>Competitive</option>
        </select>
        </div>

        <!-- FAVOURITE PLAYER -->
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="favPlayer">
            Favourite Players
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
        <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-64">
        Let's Play
        </button>
    </div>
    

  </form>


</div>

</template>