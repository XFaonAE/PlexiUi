<template>
    <div class="AxWindowButtons">
        <button @click="minimize()">
            <AxIcon icon="ChromeMinimize" />
        </button>
        
        <button @click="size()">
            <AxIcon icon="ChromeRestore" />
        </button>
    
        <button @click="close()">
            <AxIcon icon="ChromeClose" />
        </button>
    </div>
</template>

<script>
    import AxIcon from "./AxIcon";
    
    export default {
        components: {AxIcon},
        methods: {
            close() {
                window.close();
            },
            minimize() {
                if (this.$electron) {
                    this.$electron.ipcRenderer.send("minimizeWindow");
                }
            },
            size() {
                if (this.$electron) {
                    this.$electron.ipcRenderer.send("sizeWindow");
                }
            }
        }
    }
</script>

<style lang="less">
@import "config.less";

.AxWindowButtons {
    button {
        padding: 0 20px;
        background: transparent;
        color: @text;
        cursor: pointer;
        height: 30px;
        border: none;
        transition-duration: @speed;
        opacity: 0.6;
        
        &:hover {
            opacity: 1;
            background: @layer0;
        }
        
        i {
            transform: scale(0.7);
        }
    }
}
</style>