"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlexiUi_1 = __importDefault(require("../plexiui/PlexiUi"));
new /** @class */ (function () {
    function Dev() {
        var plexiUi = new PlexiUi_1.default();
        plexiUi.tasks.dev();
    }
    return Dev;
}());
