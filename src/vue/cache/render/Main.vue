<template>
    <div>
        <h1>Plexi<span class="accent">Emerald</span></h1>
        <button @click="close">Close</button>
    </div>
</template>

<script>
export default {
    methods: {
        close() {
            window.close();
        }
    }
}
</script>

<style>
body {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #121212;
    -webkit-app-region: drag;
    min-width: 100vw;
    min-height: 100vh;
    overflow: none;
    margin: 0px;
}

h1 {
    color: #888;
    font-family: sans-serif;
    display: flex;
    font-weight: lighter;
}

.accent {
    color: #50ffab;
}

* {
    -webkit-app-region: drag;
    user-select: no-select;
}

button {
    -webkit-app-region: no-drag;
    border: 1px solid #555;
    padding: 4px 12px;
    background: transparent;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
}
</style> 