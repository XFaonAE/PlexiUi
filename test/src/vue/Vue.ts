// @ts-nocheck
import {createApp} from "vue";
import Main from "./Main.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        component: {
            template: ""
        }
    },
    {
        path: "/info",
        component: {
            template: "info"
        }
    },
    {
        path: "/tests",
        component: {
            template: ""
        }
    }
];

const vueRouter = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

const app = createApp(Main);

app.use(vueRouter);
app.mount("#app");
