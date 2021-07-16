"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var vue_1 = require("vue");
var Main_vue_1 = __importDefault(require("./Main.vue"));
new /** @class */ (function () {
    /**
     * VueJS entry script
     */
    function Vue() {
        var app = vue_1.createApp(Main_vue_1.default);
        app.mount("#app");
    }
    return Vue;
}());
