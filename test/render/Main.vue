<template>
    <div class="root">
        <Frame title="PlexiUI" />
        <div>
            <Button>Hello</Button>
            <Button class="DefaultAction">Hello</Button>
        </div>
    </div>
</template>

<script>
import Frame from "./components/AxeriDev/Frame.vue";
import Button from "./components/AxeriDev/Button.vue";

export default {
    components: {
        Frame,
        Button
    }
}
</script>

<style lang="less">
@import "./components/AxeriDev/Config";

.root {
    display: flex;
    flex-direction: column;
}

body {
    margin: 0;
    padding: 0;
    background: @layer1;
}

._icon {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px; 
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}

* {
    box-sizing: border-box;
    -webkit-user-select: none;
}
</style>