<template>
    <div class="_view">
        <MarkDown file="./markdown/Welcome.md" />
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
