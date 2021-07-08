<template>
    <div class="Gutter">
        <slot />
    </div>
</template>

<style lang="less" scoped>
@import "../Config";

.Gutter {
    width: 100%;
    height: 30px;
    background: @layer0;
    display: flex;
    align-items: center;
}
</style>