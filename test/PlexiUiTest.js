"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlexiUi_1 = __importDefault(require("../src/PlexiUi"));
new /** @class */ (function () {
    function PlexiUiTest() {
        this.plexiUi = new PlexiUi_1.default({
            runnerOptions: {},
            skip: {
                vue: true,
                electron: true
            }
        }, function (event) {
            console.log(event);
        });
    }
    return PlexiUiTest;
}());
