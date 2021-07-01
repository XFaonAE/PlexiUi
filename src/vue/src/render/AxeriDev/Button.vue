<template>
    <div class="_Button">
        <span>
            <slot />
        </span>
    </div>
</template>

<style lang="less" scoped>
@import "./Config";

._Button {
    padding: 6px 12px;
    border: 2px solid @layer4;
    background: @layer4;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    transition-duration: @speed;
    min-width: 100px;
 
    span {
        color: @text;
        font-family: @fontMain;
        font-size: 13px;
    }

    &:hover {
        border-color: @layer6;

        &:active {
            opacity: 0.6;
        }
    }

    &.DefaultAction {
        background: @accent;
        border-color: @accent;
        
        span {
            color: @layer4;
        }

        &:hover {
            opacity: 0.6;

            &:active {
                opacity: 1;
            }
        }
    }
}
</style>