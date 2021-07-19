<template>
    <div class="Main">
        <TitleBar />
        <div class="body">
            <SideBar :rail=true :bar=true>
                <template v-slot:railTop>
                    <SideBarRailButton icon="ms-Icon ms-Icon--Home" label="Home" href="/" />

                    <SideBarRailButton icon="ms-Icon ms-Icon--TestBeaker" label="Tests" href="/tests" />
                </template>

                <template v-slot:railBottom>
                    <SideBarRailButton icon="ms-Icon ms-Icon--Info" label="Info" href="/info" />
                </template>
            </SideBar>

            <div class="content">
                <RouterView />
            </div>
        </div>

        <AppBar />
    </div>
</template>

<script>
import SideBar from "./components/SideBar";
import SideBarRailButton from "./components/SideBarRailButton";
import TitleBar from "./components/TitleBar";
import AppBar from "./components/AppBar";

export default {
    components: {
        AppBar,
        TitleBar,
        SideBarRailButton,
        SideBar
    },
    data: () => {
        return {
            electron: false
        };
    },
    mounted() {
        if ((window && window.process && window.process.type) === "renderer") {
            this.electron = true;
        }
        const body = document.querySelector("body");

        if (this.electron) {
            const ipcRenderer = window.require("electron").ipcRenderer;

            ipcRenderer.send("system:isDark");

            ipcRenderer.on("system:isDark.reply", (event, dark) => {
                if (dark) {
                    body.classList.remove("_SYSTEM__lightPalette");
                    body.classList.add("_SYSTEM__darkPalette");
                } else {
                    body.classList.add("_SYSTEM__lightPalette");
                    body.classList.remove("_SYSTEM__darkPalette");
                }

                console.log("THEME UPDATED: dark mode = " + dark);
            });

            ipcRenderer.on("system:themeUpdated", (event, arg) => {
                ipcRenderer.send("system:isDark");
            });
            return;
        }

        body.classList.remove("_SYSTEM__lightPalette");
        body.classList.add("_SYSTEM__darkPalette");
    }
}
</script>

<style lang="less">
@import "./components/Config";

* {
    box-sizing: border-box;
    outline: none;
    font-family: @fontMain;
}

.Main {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;

    .body {
        display: flex;
        width: 100vw;
        height: 100%;
        flex-direction: row;

        @media (max-width: 700px) {
            height: calc(100% - 50px);
        }

        .content {
            background: @layer1;
            width: 100%;
            height: 100%;
            border-radius: 4px 0 0 0;
            overflow: auto;
        }
    }
}

body {
    margin: 0;
    padding: 0;
    font-size: 13px;
    background: @layer0;
    overflow: hidden;
    color: #fff;
    opacity: 1;
}
</style>
