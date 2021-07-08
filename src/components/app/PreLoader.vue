<template>
    <div class="PreLoader visible">
        <img class="logo" draggable="false" src="../../assets/Logo.svg" />
    </div>
</template>

<script>
import $ from "jquery";

export default {
    mounted() {
        $(document).ready(() => {
            $(this.$el).removeClass("visible");
            $("._root > .app").removeClass("loading");
        });
    }
}
</script>

<style lang="less">
@import "../Config";

.PreLoader {
    width: 100vw;
    height: calc(100vh - 30px);
    position: fixed;
    background: @layer0;
    display: flex;
    align-items: center;
    transition-duration: @speedOut;
    opacity: 0;
    transition-delay: 2s;
    justify-content: center;
    pointer-events: none;
    transform: scale(0.9);
    bottom: 0;
    left: 0;

    .logo {
        position: absolute;
        transform: scale(0.5);
        animation: PreLoaderLogoAnimate 5s ease 0s infinite forwards;
        margin-bottom: 30px;
    }

    @keyframes PreLoaderLogoAnimate {
        0% {
            transform: scale(0.7);
        }

        50% {
            transform: scale(0.8);
        }

        100% {
            transform: scale(0.7);
        }
    }

    &.visible {
        transform: scale(1);
        opacity: 1;
        pointer-events: initial;
    }
}
</style>