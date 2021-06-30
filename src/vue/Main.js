import Vue from "vue";
import Main from "./cache/render/Main.vue";

new class Main {
    constructor() {
        const vue = new Vue({
            el: "#app",
            render: h => {
                return h(Main);
            }
        });
    }
}