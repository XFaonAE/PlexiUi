<template>
    <div>
        <AxWindowSidebar />
        <AxAppBar />
    </div>
</template>

<style lang="less">
    body {
        background: #191919;
        margin: 0;
    }
</style>

<script>
    import AxAppBar from "./components/AxeriDev/AxAppBar.vue";
    import AxWindowSidebar from "./components/AxeriDev/AxWindowSidebar.vue";
    
    export default {
        components: {
            AxWindowSidebar,
            AxAppBar
        }
    }
</script>