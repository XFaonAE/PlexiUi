// @ts-nocheck
import { createApp } from "vue";
import Main from "./Main";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home";

const routes = [
    {
        path: "/",
        component: Home
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
