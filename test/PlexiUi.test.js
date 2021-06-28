"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlexiUi_1 = __importDefault(require("../src/PlexiUi"));
var path_1 = __importDefault(require("path"));
new /** @class */ (function () {
    function PlexiUiTest() {
        var plexiUi = new PlexiUi_1.default();
        plexiUi.run({
            renderDir: path_1.default.join(__dirname, "./render")
        });
    }
    return PlexiUiTest;
}());
