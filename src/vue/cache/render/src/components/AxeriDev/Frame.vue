<template>
    <div class="_Frame">
        <div class="Section Title">
            <span>
                {{ title }}
            </span>
        </div>

        <div class="Section WindowButtons">
            <button>
                <span class="_icon">remove</span>
            </button>

            <button>
                <span class="_icon">check_box_outline_blank</span>
            </button>

            <button>
                <span class="_icon">close</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title"]
}
</script>

<style lang="less" scoped>
@import "./Config";

._Frame {
    width: 100vw;
    height: 30px;
    background: @layer0;
    -webkit-app-region: drag;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;

    .WindowButtons {
        -webkit-app-region: no-drag;
        margin-right: -20px;
        
        button {
            border: none;
            height: 30px;
            padding: 0px 20px;
            background: transparent;
            color: @text;
            cursor: pointer;
            opacity: 0.6;
            transition-duration: @speed;

            ._icon {
                font-size: 12px;
            }

            &:hover {
                opacity: 1;
                background: @layer1;
            }
        }
    }

    .Title {
        span {
            color: @text;
            font-family: @fontMain;
            font-size: 12px;
        }
    }
}
</style>