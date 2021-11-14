<template>
  <div v-on:click="$emit('emit-click', $event)" class="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center">
    <img v-if="showImg" class="w-full h-full rounded-full object-cover" v-bind:src="imgSrc" alt="">
    <span v-else>{{this.initials}}</span>
    
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
            if (this.imgSrc == 'null' || this.imgSrc == 'undefined' || this.imgSrc == '') {
              console.log('false')
              return false
            }
            console.log('true')
            return true
        }
    },

    methods: {
    }

    // setup(props) {
    //     console.log(`=== setup from theprofileicon.vue ===`)
    //     console.log(props.imgSrc.length)
    //     console.log(props.imgSrc)
    //     console.log(typeof props.imgSrc)

    //     console.log(props.initials)
    //     console.log(`=== end ofsetup from theprofileicon.vue ===`)
    // }
    
}
</script>

<style>

</style>