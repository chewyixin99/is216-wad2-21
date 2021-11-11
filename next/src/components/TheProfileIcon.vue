<template>
  <div class="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center">
      <span v-if="showImg" >{{this.initials}}</span>
      <span v-else > <img class="object-cover rounded-full" v-bind:src="imgSrc" alt=""> </span>
  </div>
</template>

<script>
export default {
    name: "TheProfileIcon",

    props: { // span should be changed to button and redirect user to profile
        id: {type: String},
        initials: {type: String}, // test
        imgSrc: {type: String},
    },

    computed: {
        showImg() {
            return this.imgSrc.length == 0 || this.imgSrc == 'null'
        }
    },

    // setup(props) {
    //     console.log(`=== setup from theprofileicon.vue ===`)
    //     // console.log(props.imgSrc.length)
    //     console.log(props.imgSrc)
    //     console.log(typeof props.imgSrc)
    //     console.log(`=== end ofsetup from theprofileicon.vue ===`)
    // }
    
}
</script>

<style>

</style>