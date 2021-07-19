<template>
    <div class="AppBar">

    </div>
</template>

<script>
export default {
    name: "AppBar"
}
</script>

<style lang="less">
@import "./Config";

.AppBar {
    width: 100vw;
    transition-duration: 300ms;
    height: 0;
    background: @layer0;
    overflow: hidden;
    display: flex;

    @media (max-width: 700px) {
        height: 50px;
        transition-duration: 100ms;
    }
}
</style>