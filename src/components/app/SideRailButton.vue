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
    text-decoration: none;

    .icon {
        font-size: 20px;
    }

    &:hover {
        opacity: 1;
        background: @layer2;
        transition-duration: @speedIn;
    }

    &.router-link-active {
        color: @accent;
        opacity: 1;
    }
}
</style>