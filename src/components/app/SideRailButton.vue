<template>
    <RouterLink class="SideRailButton" :to="href">
        <i :class="icon"></i>
    </RouterLink>
</template>

<script>
export default {
    props: [
        "href",
        "icon"
    ]
}
</script>

<style lang="less">
@import "../Config";

.SideRailButton {
    display: flex;
    width: 50px;
    height: 50px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition-duration: @speedOut;
    opacity: 0.6;
    color: @text;
    border-left: 2px solid transparent;
    padding-right: 2px;
    text-decoration: none;
    overflow: hidden;

    .icon {
        font-size: 20px;
    }

    &:hover {
        opacity: 1;
        background: @layer2;
        transition-duration: @speedIn;
    }

    &.router-link-active {
        border-color: @text;
        color: @text;
        opacity: 1;
    }
}
</style>