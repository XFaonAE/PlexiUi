<template>
    <div class="Gutter">
        <slot />
    </div>
</template>

<style lang="less" scoped>
@import "../Config";

.Gutter {
    width: 100vw;
    height: 30px;
    position: fixed;
    bottom: 0;
    background: @layer0;
    display: flex;
    align-items: center;
    left: 0;
}
</style>