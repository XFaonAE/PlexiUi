<template>
    <button class="AxButton">
        <slot />
    </button>
</template>

<script>
export default {
}
</script>

<style lang="less">
    @import "config.less";
    
    .AxButton {
        padding: 6px 10px;
        border: 2px solid @layer4;
        background: @layer4;
        cursor: pointer;
        transition-duration: @speed;
        color: @text;
        border-radius: 2px;
        min-width: 64px;
        
        &:hover {
            border-color: @layer6;
        }
        &:active {
            opacity: 0.6;
        }
    }
</style>