<template>
    <div class="SideRail">
        <button class="menu" @click="toggleSideBar">
            <i class="fal fa-bars"></i>
        </button>
        <slot />
    </div>
</template>

<script>
import SideRailButton from './SideRailButton'
import $ from "jquery";

export default {
    components: {
        SideRailButton
    },
    methods: {
        toggleSideBar() {
            $(".SideBar").toggleClass("forceOpen");
        }
    }
}
</script>

<style lang="less" scoped>
@import "../Config";

.SideRail {
    width: 50px;
    min-width: 50px;
    height: 100%;
    background: @layer1;

    .menu {
        height: 50px;
        transition-duration: @speedOut;
        width: 50px;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        color: @text;
        border: none;
        background: transparent;
        overflow: hidden;
    }

    @media (max-width: 1000px) {
        background: @layer0;
        z-index: 3;
        border-right: 1px solid @layer3;

        .menu {
            display: flex;
            opacity: 0.6;

            &:hover {
                opacity: 100%;
                transition-duration: @speedIn;
                background: @layer1;
                cursor: pointer;
            }
        }
    }
}
</style>