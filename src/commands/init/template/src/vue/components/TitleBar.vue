<template>
    <div class="TitleBar">
        <span class="title">
            {{ title }}
        </span>

        <div class="buttons">
            <button @click="electronMinimize">
                <i class="ms-Icon ms-Icon--ChromeMinimize"></i>
            </button>

            <button @click="electronSize">
                <i class="ms-Icon ms-Icon--Checkbox"></i>
            </button>

            <button @click="electronStop" class="close">
                <i class="ms-Icon ms-Icon--ChromeClose"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TitleBar",
    data() {
        return {
            title: "No Title",
            electron: false
        };
    },
    mounted() {
        if ((window && window.process && window.process.type) === "renderer") {
            this.electron = window.require("electron");
            return;
        }

        this.$el.remove();
    },
    methods: {
        getElectron() {
            if (this.electron) {
                return this.electron;
            }

            return null;
        },
        electronStop() {
            this.getElectron()?.ipcRenderer.send("electron:stop");
        },
        electronSize() {
            this.getElectron()?.ipcRenderer.send("electron:size");
        },
        electronMinimize() {
            this.getElectron()?.ipcRenderer.send("electron:minimize");
        }
    }
}
</script>

<style lang="less">
@import "./Config";

.TitleBar {
    -webkit-app-region: drag;
    width: 100%;
    display: flex;
    background: @layer0;
    justify-content: space-between;
    height: 50px;

    &.disabled {
        height: 0;
    }

    .title {
        color: @contrast;
        padding: 0 20px;
        height: 30px;
        display: flex;
        align-items: center;
        font-size: 10px;
    }

    .buttons {
        button {
            border: none;
            height: 30px;
            padding: 0 20px;
            background: transparent;
            transition-duration: 300ms;
            color: @contrast;
            -webkit-app-region: no-drag;
            cursor: pointer;

            i {
                font-size: 8px;
            }

            &:hover {
                background: @layer1;
                transition-duration: 100ms;

                &.close {
                    border-color: @destructive;
                }
            }
        }
    }
}
</style>