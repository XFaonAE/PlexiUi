<template>
    <div class="_root">
        <SideRail>
            <SideRailButton href="/b" icon="fab fa-github" />
        </SideRail>

        <side-bar></side-bar>

        <Frame :title="$config.title" />
        <Gutter>
            <GutterButton @click="plexiuiGutterClick">PlexiUI {{ $package.version }}</GutterButton>
        </Gutter>

        <RouterView></RouterView>
    </div>
</template>

<script>
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
        GutterButton, SideRailButton
    },
    methods: {
        plexiuiGutterClick() {
            alert("PlexiUI");
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
}
</style>