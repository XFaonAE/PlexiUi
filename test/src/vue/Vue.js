"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var vue_1 = require("vue");
var Main_vue_1 = __importDefault(require("./Main.vue"));
var vue_router_1 = require("vue-router");
var routes = [
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
var vueRouter = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(process.env.BASE_URL),
    routes: routes
});
var app = vue_1.createApp(Main_vue_1.default);
app.use(vueRouter);
app.mount("#app");
