<template>
    <div class="_view">
        <MarkDown md="## Welcome\n Welcome to the homepage of your application!" />
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
</style>
