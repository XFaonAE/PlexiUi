<template>
    <div class="_root">
        <Frame ref="_Frame" :title="$config.title" />

        <div class="app loading">
            <SideRail>
                <SideRailButton href="/" icon="fal fa-home" />
                
                <SideRailButton href="/github" icon="fab fa-github" />
            </SideRail>
            <side-bar>
                <SideBarLinks :links="[
                    {
                        label: 'Home',
                        href: '/',
                        icon: 'fal fa-home'
                    },
                    {
                        label: 'GitHub',
                        href: '/github',
                        icon: 'fab fa-github'
                    }
                ]"></SideBarLinks>
            </side-bar>
            
            <RouterView></RouterView>
        </div>
        <PreLoader />
    </div>
</template>

<script>
import SideBarLinks from './components/app/SideBarLinks.vue'
import PreLoader from './components/app/PreLoader.vue'
import SideRailButton from './components/app/SideRailButton.vue'
import SideRail from "./components/app/SideRail";
import SideBar from "./components/app/SideBar";
import Frame from "./components/app/Frame";
import $ from "jquery";

export default {
    components: {
        SideRail,
        SideBar,
        Frame,
        SideRailButton, 
        PreLoader, 
        SideBarLinks
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

            setTimeout(() => {
                $(this.$el).find("._view").addClass("slideDown");
                setTimeout(() => {
                    $(this.$el).find("._view").removeClass("slideDown");
                }, 10);
            }, 1);
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
    user-select: none;

    .app {
        width: 100vw;
        height: calc(100vh - 30px);
        display: flex;
        flex-direction: row;

        &.loading {
            transform: scale(0.95);
        }
    }
}

._view {
    height: calc(100vh - 30px);
    max-height: calc(100vh - 30px);
    overflow: auto;
    width: 100%;
    transition-duration: @speedOut;

    &.slideDown {
        height: calc(100vh - 30px - 50px);
        margin-top: 50px;
        transition-duration: 0ms;
    }
}

::selection {
    background: @accent;
    color: @layer0;
}

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
</style>