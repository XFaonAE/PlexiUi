"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var PlexiUi_1 = __importDefault(require("../../src/PlexiUi"));
new /** @class */ (function () {
    function Pack() {
        var plexiUi = new PlexiUi_1.default();
        plexiUi.package({
            out: path_1.default.join(__dirname, "../build")
        });
    }
    return Pack;
}());
