"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var vue_1 = require("vue");
var Main_1 = __importDefault(require("./Main"));
var vue_router_1 = require("vue-router");
var Home_1 = __importDefault(require("./views/Home"));
var routes = [
    {
        path: "/",
        component: Home_1.default
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
var app = vue_1.createApp(Main_1.default);
app.use(vueRouter);
app.mount("#app");
