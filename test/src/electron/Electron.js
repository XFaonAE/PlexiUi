"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var electron_1 = require("electron");
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
new /** @class */ (function () {
    /**
     * ElectronJS entry script
     */
    function Electron() {
        var _this = this;
        electron_1.app.on("ready", function () {
            _this.buildWindow();
        });
    }
    /**
     * Build the main browser window
     */
    Electron.prototype.buildWindow = function () {
        var browserWindow = this.browserWindow = new electron_1.BrowserWindow({
            width: 1500,
            height: 800
        });
        if (electron_is_dev_1.default) {
            browserWindow.loadURL("http://localhost:8080").then(function () {
                console.log("_plexi-ui -> [ status ] -> ( ready ) -> [ process ] -> ( development )");
            });
            return;
        }
        browserWindow.loadFile(path.join(__dirname, "./../../build/vue/index.html"));
        console.log("_plexi-ui -> [ status ] -> ( ready ) -> [ process ] -> ( production )");
    };
    return Electron;
}());
