<template>
  <div class="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center">
      <span>{{this.initials}}</span>
  </div>
</template>

<script>
export default {
    name: "TheProfileIcon",

    props: { // span should be changed to button and redirect user to profile
        id: {type: String},
        initials: {type: String} // test
    }
}
</script>

<style>

</style>