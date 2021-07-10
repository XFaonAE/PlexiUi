<template>
    <div class="Frame">
        <img class="logo" src="../../assets/Logo.svg" />

        <span class="title">
            {{ appTitle }}
        </span>

        <div class="buttons">
            <button @click="minimizeWin">
                <i class="fal fa-minus"></i>
            </button>

            <button @click="sizeWin">
                <i class="fal fa-square"></i>
            </button>

            <button class="close" @click="closeWin">
                <i class="fal fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            appTitle: ""
        };
    },
    methods: {
        sizeWin() {
            this.$window.ipcRenderer.send("windowSize");
        },
        closeWin() {
            window.close();
        },
        minimizeWin() {
            this.$window.ipcRenderer.send("windowMinimize");
        },
        setTitle(title) {
            this.appTitle = title;
        }
    }
}
</script>

<style lang="less" scoped>
@import "../Config";

.Frame {
    width: 100vw;
    height: 30px;
    background: @layer0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-app-region: drag;

    .logo {
    }

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

            &.close {
                background: @accent;
                color: @layer0;
            }
        }
    }
}
</style>