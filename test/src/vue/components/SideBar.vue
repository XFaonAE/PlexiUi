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
            BAR
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SideBar",
    props: [
        "rail",
        "bar"
    ]
}
</script>

<style lang="less">
@import "./Config";

.SideBar {
    height: 100%;
    background: @layer0;

    .rail {
        width: 70px;
        height: 100%;
        color: @contrast;
        display: flex;
        overflow: auto;
        justify-content: space-between;
        flex-direction: column;

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