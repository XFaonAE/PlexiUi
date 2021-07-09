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
    background: @layer0;

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
}
</style>