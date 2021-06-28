<template>
    <input class="AxInput" :placeholder="placeholder" :value="value" />
</template>

<script>
    export default {
        props: [ "placeholder", "value" ]
    }
</script>

<style lang="less">
    @import "config.less";
    
    .AxInput {
        border: 2px solid @layer3;
        padding: 6px 10px;
        color: @text;
        transition-duration: @speed;
        background: transparent;
        border-radius: 2px;
        
        &:hover {
            border-color: @layer4;
        }
        &:focus {
            border-color: @accent;
        }
    }
</style>