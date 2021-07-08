"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var Main_vue_1 = __importDefault(require("../../../src/Main.vue"));
var vue_router_1 = require("vue-router");
var GitHub_vue_1 = __importDefault(require("../../../src/views/GitHub.vue"));
var config = require("../../../config.json");
var electron = window.require("electron");
var packageJson = require("../../../package.json");
var routerHistory = vue_router_1.createWebHistory();
var router = vue_router_1.createRouter({
    history: routerHistory,
    routes: [
        {
            path: "/",
            component: {
                template: GitHub_vue_1.default
            }
        },
        {
            path: "/github",
            component: GitHub_vue_1.default
        }
    ]
});
var vue = vue_1.createApp(Main_vue_1.default);
vue.use(router);
vue.config.globalProperties.$window = electron;
vue.config.globalProperties.$config = config;
vue.config.globalProperties.$package = packageJson;
vue.mount("#app");
