import Vue from "vue";
import Main from "./render/Main.vue";

new class Renderer {
    /**
     * Main VueJS script
     */
    public constructor() {
        const viewModel = new Vue({
            el: "#app",
            render: (h: any) => {
                return h(Main);
            }
        });
    }
}