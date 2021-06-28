<template>
    <div class="AxCheckBox">
        <input type="checkbox" />
        <span></span>
    </div>
</template>

<style lang="less">
    @import "config.less";
    
    .AxCheckBox {
        width: 17px;
        height: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        
        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 17px;
            opacity: 0;
            cursor: pointer;
            height: 17px;
            border: none;
            margin: 0;
        }
        
        span {
            width: 17px;
            height: 17px;
            display: flex;
            border-radius: 2px;
            background: transparent;
            border: 2px solid @layer4;
            transition-duration: @speed;
            pointer-events: none;
            align-items: center;
            justify-content: center;
            color: transparent;
        }
        
        &:hover {
            span {
                border-color: @layer5;
            }
        }
        
        input:checked ~ span {
            border-color: @accent;
        }
    }
</style>