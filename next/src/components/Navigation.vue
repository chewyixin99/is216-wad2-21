<template>
  <nav id="nav" class="flex items-center justify-between flex-wrap p-6 bg-purple-900">
    <router-link to="/" class="flex items-center flex-shrink-0 text-white mr-6">
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="120" height="40" fill="url(#pattern0)"/>
        <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_113:1412" transform="translate(0 -0.00133156) scale(0.00133156 0.00399467)"/>
        </pattern>
        <image id="image0_113:1412" width="751" height="251" xlink:href="data:image/png;base64,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"/>
        </defs>
      </svg>
    </router-link>

    <div class="block lg:hidden">
      <button @click="toggleNavBar()" class="flex items-center px-3 py-2 text-white hover:text-white hover:bg-purple-700 rounded">
        <svg class="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>

    <div :class="showMenu ? 'block' : 'hidden'" class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-md lg:flex-grow lg:flex justify-end">
        <router-link to="/" class="block my-4 lg:inline-block text-white lg:my-0 hover:text-gray-300 mr-10">HOME</router-link>

        <router-link to="/about" class="block my-4 lg:inline-block text-white lg:my-0 hover:text-gray-300 mr-10">ABOUT</router-link> 
        
        <router-link to="/profile" class="block my-4 lg:inline-block text-white lg:my-0 hover:text-gray-300 mr-10">PROFILE</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
  data() {
    return {
      showMenu: false 
    }
  },
  methods : {
    toggleNavBar() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style>

</style>