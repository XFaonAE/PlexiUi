<template>
    <div class="SideRail">
        <slot />
    </div>
</template>

<style lang="less" scoped>
@import "../Config";

.SideRail {
    width: 50px;
    min-width: 50px;
    height: 100%;
    background: @layer1;
}
</style>