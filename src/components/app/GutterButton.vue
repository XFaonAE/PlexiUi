<template>
    <button class="GutterButton">
        <slot />
    </button>
</template>

<style lang="less">
@import "../Config";

.GutterButton {
    border: none;
    padding: 0px 10px;
    background: transparent;
    color: @text;
    opacity: 0.6;
    cursor: pointer;
    height: 30px;
    transition-duration: @speedOut;
    font-size: 11px;

    &:hover {
        opacity: 1;
        background: @layer1;
        transition-duration: @speedIn;
    }
}
</style>