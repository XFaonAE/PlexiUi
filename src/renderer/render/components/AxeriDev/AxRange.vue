<template>
    <input class="AxRange" type="range" />
</template>

<script>
export default {
}
</script>

<style lang="less">
    @import "config.less";
    
    .AxRange {
        -webkit-appearance: none;
        width: 250px;
        height: 3px;
        background: @layer4;
        border-radius: 2px;
        transition-duration: @speed;
        
        &:hover {
            background: @layer5;
        }
        
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 5px;
            height: 20px;
            background: @accent;
            cursor: pointer;
            transition-duration: @speed;
            border-radius: 2px;
            
            &:active {
                opacity: 0.6;
            }
        }
    }
</style>