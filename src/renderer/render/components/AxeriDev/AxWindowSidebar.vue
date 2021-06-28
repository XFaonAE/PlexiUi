<template>
    <div class="AxWindowSidebar">
    </div>
</template>

<script>
import AxIcon from "./AxIcon.vue";
export default {
    components: {
        AxIcon
    },
    methods: {
        back() {
            history.back();
        }
    }
}
</script>

<style lang="less">
@import "config.less";

.AxWindowSidebar {
    width: 310px;
    height: 100vh;
    background: @layer0;
    
    .header {
        width: 100%;
        display: flex;
        height: 30px;
        -webkit-app-region: drag;
        
        button {
            border: none;
            padding: 0 20px;
            color: @text;
            background: transparent;
            height: 30px;
            cursor: pointer;
            opacity: 0.6;
            transition-duration: @speed;
            
            i {
                transform: scale(0.7);
            }
            
            &:hover {
                background: @layer1;
                opacity: 1;
            }
        }
        
        span {
            color: @text;
            font-family: @fontMain;
            font-size: 11px;
            padding: 0 10px;
            height: 30px;
            display: flex;
            align-items: center;
        }
    }
}
</style>