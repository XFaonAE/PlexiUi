<template>
    <div class="SideRail">
        <slot />
    </div>
</template>

<style lang="less" scoped>
@import "../Config";

.SideRail {
    width: 50px;
    height: calc(100vh - 60px);
    margin-top: 30px;
    background: @layer1;
}
</style>