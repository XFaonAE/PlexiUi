<template>
    <div class="SideBar">
        <div class="header">
            <span>Quick Navigation</span>
        </div>
        <slot />
    </div>
</template>

<style lang="less" scoped>
@import "../Config";

.SideBar {
    width: 270px;
    min-width: 270px;
    height: 100%;
    transition-duration: @speedOut;
    background: @layer0;
    overflow: hidden;

    .header {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid @layer4;
        color: @text;
        display: flex;
        align-items: center;
        font-size: 11px;
        font-family: @fontMain;
        padding: 0px 20px;
    }

    @media (max-width: 1000px) {
        left: calc(-270px + 50px);
        z-index: 2;
        position: fixed;
    }

    &.forceOpen {
        left: 50px;
    }
}
</style>