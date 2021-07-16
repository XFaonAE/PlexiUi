// @ts-nocheck
import { createApp } from "vue";
import Main from "./Main.vue";

new class Vue {
    /**
     * VueJS entry script
     */
    public constructor() {
        const app = createApp(Main);
        app.mount("#app");
    }
}
