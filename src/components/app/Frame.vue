<template>
    <div class="Frame">
        <span class="title">
            {{ title }}
        </span>

        <div class="buttons">
            <button @click="minimizeWin">
                <i class="fal fa-minus"></i>
            </button>

            <button @click="sizeWin">
                <i class="fal fa-square"></i>
            </button>

            <button @click="closeWin">
                <i class="fal fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "title"
    ],
    methods: {
        sizeWin() {
            this.$window.ipcRenderer.send("windowSize");
        },
        closeWin() {
            window.close();
        },
        minimizeWin() {
            this.$window.ipcRenderer.send("windowMinimize");
        }
    }
}
</script>

<style lang="less" scoped>
@import "../Config";

.Frame {
    width: 100vw;
    height: 30px;
    position: fixed;
    top: 0;
    background: @layer0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: 0;
    -webkit-app-region: drag;

    .title {
        color: @text;
        font-family: @fontMain;
        font-size: 11px;
        margin-left: 20px;
    }

    .buttons button {
        border: none;
        height: 30px;
        padding: 0px 20px;
        background: transparent;
        cursor: pointer;
        opacity: 0.6;
        -webkit-app-region: no-drag;
        transition-duration: @speedOut;
        color: @text;

        i {
            font-size: 11px;
        }

        &:hover {
            opacity: 1;
            background: @layer1;
            transition-duration: @speedIn;
        }
    }
}
</style>