import { createApp } from "vue";
import Vue from "vue";
import App from "../../../src/Main.vue";
import { createRouter, createWebHistory } from "vue-router";
const config = require("../../../config.json");
const electron = window.require("electron");
const packageJson = require("../../../package.json");

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: {
        template: ""
      }
    }
  ]
});

const vue = createApp(App);
vue.use(router);

vue.config.globalProperties.$window = electron;
vue.config.globalProperties.$config = config;
vue.config.globalProperties.$package = packageJson;

vue.mount("#app");
