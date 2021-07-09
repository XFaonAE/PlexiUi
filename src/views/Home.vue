<template>
    <div class="_view">
        <h1 class="logo">PlexiUI</h1>
        <MarkDown md="# \nWelcome to the homepage of your application!" />
    </div>
</template>

<script>
import MarkDown from "../components/ux/MarkDown";

export default {
  components: {
    MarkDown,
  },
};
</script>

<style lang="less" scoped>
@import "../components/Config";

._view {
  padding: 20px;
}

.logo {
    font-family: @fontLogo;
    color: @accent;
    letter-spacing: 10px;
    margin: 0 0 10px 0;
}
</style>
