<template>
    <!-- Use :onClick on the component to pass a function into it 
    Note: When using stores will call recursively, so need helper and bind helper without () to :onclick
    e.g. :onClick="helper" -->
    <button @click="$emit('onClick')" :class="getButtonType()" class="font-bold inline-flex items-center justify-center">
        <slot>BUTTON</slot>
    </button>
</template>

<script>
export default {
    name: "TheButton",
    props: {
        buttonType: {type: String},
    },

    data() {
        return {
            "allButtonTypes" : {
                // "form-xs": "w-32 py-5 h-5 text-sm rounded",
                "form-sm": "w-28 py-5 h-5 text-sm rounded",
                "form-md": "w-32 py-5 h-8 text-sm rounded",
                "form-lg": "w-36 py-5 h-8 text-sm rounded",
                "form-full": "w-full h-8 py-5 text-sm rounded",
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