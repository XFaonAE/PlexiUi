import VueRouter from "vue-router";
import Vue from "vue";
import Main from "./cache/render/src/Main.vue";
import router from "./cache/render/src/router";

new class Main {
    constructor() {
        Vue.use(VueRouter);

        const vue = new Vue({
            render: h => {
                return h(Main);
            },
            router
        });

        vue.$mount("#app");
    }
}