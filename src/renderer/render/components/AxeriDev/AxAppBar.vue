<template>
    <div class="AxAppBar">
        <div class="section title">
            <button>
                <AxIcon icon="Back" />
            </button>
            
            <span>Application Title</span>
        </div>
        
        <AxWindowButtons class="section" />
    </div>
</template>

<style lang="less">
    @import "./config.less";
    
    .AxAppBar {
        width: 100vw;
        height: 30px;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        -webkit-app-region: drag;
        -webkit-user-select: none;
        align-items: center;
        background: @layer0;
        
        .section {
            -webkit-app-region: no-drag;
        }
        
        .title {
            span {
                color: @text;
                font-family: @fontMain;
                font-size: 11px;
                padding: 0 10px;
                -webkit-app-region: drag;
            }
            
            button {
                border: none;
                padding: 0 20px;
                height: 30px;
                color: @text;
                background: transparent;
                cursor: pointer;
                transition-duration: @speed;
                opacity: 0.6;
                
                i {
                    transform: scale(0.7);
                }
                
                &:hover {
                    background: @layer1;
                    opacity: 1;
                }
            }
        }
    }
</style>

<script>
    import AxIcon from "./AxIcon.vue";
    import AxWindowButtons from "./AxWindowButtons.vue";

    export default {
        components: {
            AxWindowButtons,
            AxIcon
        }
    }
</script>