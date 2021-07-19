<template>
    <div class="SideBar">
        <div class="rail" v-if="rail">
            <div>
                <slot name="railTop" />
            </div>

            <div>
                <slot name="railBottom" />
            </div>
        </div>

        <div class="bar" v-if="bar">
        </div>
    </div>
</template>

<script>
export default {
    name: "SideBar",
    props: [
        "rail",
        "bar"
    ],
    mounted() {
        if ((window && window.process && window.process.type) !== "renderer") {
            this.$el.classList.add("noTitleBar");
        }
    }
}
</script>

<style lang="less">
@import "./Config";

.SideBar {
    height: 100%;
    background: @layer1;
    display: flex;
    flex-direction: row;
    transition-duration: 300ms;

    .bar {
        width: 290px;
        height: 100%;
        background: @layer0;
        transition-duration: 300ms;

        @media (max-width: 1000px) {
            width: 0;
            transition-duration: 100ms;
            border-color: @layer0;
        }
    }

    .rail {
        width: 70px;
        height: 100%;
        color: @contrast;
        display: flex;
        padding-top: 5px;
        overflow-y: auto;
        transition-duration: 300ms;
        overflow-x: hidden;
        justify-content: space-between;
        flex-direction: column;

        @media (max-width: 1000px) {
            background: @layer0;
        }

        @media (max-width: 700px) {
            width: 0;
            transition-duration: 100ms;
        }

        & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        & > div:nth-child(1) {
            .SideBarRailButton {
                margin-bottom: 5px;
            }
        }

        & > div:nth-child(2) {
            margin-bottom: 10px;

            .SideBarRailButton {
                margin-top: 5px;
            }
        }
    }
}
</style>