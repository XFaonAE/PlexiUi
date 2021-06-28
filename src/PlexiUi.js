"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer_1 = __importDefault(require("./plexiUi/Renderer"));
var PlexiUi = /** @class */ (function () {
    function PlexiUi() {
        var renderer = new Renderer_1.default();
    }
    return PlexiUi;
}());
exports.default = PlexiUi;
