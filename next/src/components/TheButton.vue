<template>
    <button :class="getButtonType()" class="font-bold inline-flex items-center justify-center">
        {{this.buttonName}}
    </button>
</template>

<script>
export default {
    name: "TheButton",
    props: {
        buttonName: {type: String},
        buttonType: {type: String},
    },

    data() {
        return {
            "allButtonTypes" : {
                "form-sm": "w-40 h-8 rounded",
                "form-md": "w-48 h-8 rounded",
                "form-lg": "w-56 h-8 rounded",
                "add": "w-20 h-20 rounded-full",
            },
        }
    },

    
    methods: {
        getButtonType() {
            return this.allButtonTypes[this.buttonType]
        },

    }

}
</script>

<style>

</style>