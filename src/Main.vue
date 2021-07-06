<template>
    <div>
        <div class="_header">
            <span class="title">
                {{ title }}
            </span>
            
            <div>
                <button @click="windowMinimize()">
                    <span class="icon">remove</span>
                </button>
    
                <button @click="windowSize()"> 
                    <span class="icon">check_box_outline_blank</span>
                </button>
                
                <button @click="windowClose()">
                    <span class="icon">close</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
    data: () => {
        return {
            title: "PlexiUi Application"
        };
    },
    methods: {
        windowClose() {
            window.close();
        },
        windowSize() {
            ipcRenderer.send("windowSize");
            
        },
        windowMinimize() {
            ipcRenderer.send("windowMinimize");
        }
    }
}
</script>

<style lang="less">
@font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v92/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 300;
    src: url("./fonts/Montserrat.ttf") format('woff2');
}

.icon {
    font-family: 'Material Icons',sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: 11px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
}

body {
    margin: 0;
    background: #101010;
}
* {
    box-sizing: border-box;
}

._accent {
    color: #50ffab;
}

.welcome {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 30px);
    flex-direction: column;
    
    h1 {
        color: #fff;
        font-weight: lighter;
        font-family: Montserrat;
        margin: 0px 0px 10px 0px;
        width: 50vw;
        border-bottom: 1px solid #202020;
        display: flex;
        justify-content: center;
        font-size: 40px;
        padding-bottom: 10px;
    }

    p {
        font-size: 13px;
        margin: 10px 0px 0px 0px;
        font-family: Montserrat;
        color: #fff;
    }
}

._header {
    width: 100vw;
    height: 30px;
    background: #050505;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    -webkit-app-region: drag;
    -webkit-user-select: none;
    
    .title {
        color: #fff;
        font-family: Montserrat;
        font-size: 11px;
    }
    
    div {
        margin-right: -20px;
        -webkit-app-region: no-drag;
        
        button {
            border: none;
            background: transparent;
            color: #fff;
            padding: 0 20px;
            height: 30px;
            cursor: pointer;
            transition-duration: 200ms;
            opacity: 0.6;
            
            &:hover {
                opacity: 1;
                background: #101010;
            }
        }
    }
}
</style>