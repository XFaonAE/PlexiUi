"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var Main_vue_1 = __importDefault(require("./render/Main.vue"));
new /** @class */ (function () {
    /**
     * Main VueJS script
     */
    function Renderer() {
        var viewModel = new vue_1.default({
            el: "#app",
            render: function (h) {
                return h(Main_vue_1.default);
            }
        });
    }
    return Renderer;
}());
