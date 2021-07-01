"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var Main_vue_1 = __importDefault(require("./render/Main.vue"));
require("./registerServiceWorker");
var router_1 = __importDefault(require("./router"));
var store_1 = __importDefault(require("./store"));
vue_1.createApp(Main_vue_1.default).use(store_1.default).use(router_1.default).mount('#app');
