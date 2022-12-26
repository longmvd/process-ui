<template>
    <button :class='"btn " + buttonClass' :tooltip="tooltip" :id="buttonId" :tabindex="tabindex">
        <i style="font-style: normal;" v-for="component, index in components" :key="index" :class="component.class">{{component?.content}}</i>
    </button>
</template>

<script>
// import BaseTooltip from './BaseTooltip.vue'
export default {
    name: 'BaseButton',
    props: {
        config: Object,
        buttonClass: String,
        buttonId: String,
        iconClass: String,
        components: Array,
        tooltip: String,
        tabindex: Number,
    },
    components:{
        // BaseTooltip
    }

}
</script>

<style>
/* @import url(./css/components/button.css); */
</style>