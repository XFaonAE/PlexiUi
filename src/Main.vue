<template>
    <div class="_root">
        <Frame ref="_Frame" :title="$config.title" />

        <div class="app loading">
            <SideRail>
                <SideRailButton href="/" icon="fal fa-home" />
                
                <SideRailButton href="/github" icon="fab fa-github" />
            </SideRail>
            <side-bar></side-bar>
            
            <RouterView></RouterView>
        </div>

        <Gutter>
            <GutterButton @click="plexiuiGutterClick">PlexiUI {{ $package.version }}</GutterButton>
        </Gutter>
        <PreLoader />
    </div>
</template>

<script>
import PreLoader from './components/app/PreLoader.vue'
import SideRailButton from './components/app/SideRailButton.vue'
import GutterButton from './components/app/GutterButton.vue'
import SideRail from "./components/app/SideRail";
import SideBar from "./components/app/SideBar";
import Frame from "./components/app/Frame";
import Gutter from "./components/app/Gutter";

export default {
    components: {
        SideRail,
        SideBar,
        Frame,
        Gutter,
        GutterButton, 
        SideRailButton, 
        PreLoader
    },
    methods: {
        plexiuiGutterClick() {
            alert("PlexiUI");
        }
    },
    watch: {
        $route (to, from) {
            let path = to.path.split("/")[1];
            if (path == "") {
                path = "home";
            }

            const title = this.$config.title + " - " + path;

            this.$refs._Frame.setTitle(title);
            document.title = title;
        }
    } 
}
</script>

<style lang="less">
@import "./components/Config";

body {
    margin: 0;
    background: @layer1;
}
* {
    box-sizing: border-box;
}
._root {
    display: flex;
    flex-direction: column;

    .app {
        width: 100vw;
        height: calc(100vh - 60px);
        display: flex;
        flex-direction: row;
        transition-duration: @speedOut;
        transition-delay: 2s;

        &.loading {
            transform: scale(0.9);
        }
    }
}

._view {
    margin-top: 30px;
    height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    overflow: auto;
    width: 100%;

    &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
    }

    &::-webkit-scrollbar-track {
        background: @layer0;
    }

    &::-webkit-scrollbar-thumb {
        background: @accent;
    }
}

::selection {
    background: @accent;
    color: @layer0;
}
</style>