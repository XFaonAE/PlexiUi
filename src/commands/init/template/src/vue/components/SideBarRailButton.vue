<template>
    <RouterLink :to="href ? href : '///no///route///found///'" class="SideBarRailButton">
        <div class="center">
            <div class="border"></div>
            <i :class="'icon ' + icon"></i>
        </div>
    </RouterLink>
</template>

<script lang="ts">
export default {
    name: "SideBarRailButton",
    props: [
        "href",
        "icon"
    ]
}
</script>

<style lang="less">
@import "./Config";

.SideBarRailButton {
    width: 60px;
    height: 50px;
    cursor: pointer;
    text-decoration: none;
    color: @contrast;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    border-radius: 4px;
    transition-duration: 300ms;

    .center {
        width: 100%;
        display: flex;
        transition-duration: 300ms;
        align-items: center;
        justify-content: center;

        .border {
            height: 20px;
            width: 4px;
            border-radius: 4px;
            position: absolute;
            transition-duration: 300ms;
            top: 25px;
            left: 0;
            transform: translate(0px, -50%);
        }

        .icon {
            font-size: 18px;
            display: flex;
            align-items: center;
            flex-direction: column;
            color: @contrast;
            transition-duration: 300ms;
        }
    }

    &:hover {
        transition-duration: 100ms;
        background: @layer0;

        @media (max-width: 1000px) {
            background: @layer1;
        }
    }

    &.router-link-active {
        color: @accent;
        transition-duration: 100ms;

        .center {
            transition-duration: 100ms;

            .border {
                transition-duration: 100ms;
                background: @accent;
            }

            .icon {
                transition-duration: 100ms;
                color: @accent;
            }
        }
    }
}
</style>