"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
var path_1 = __importDefault(require("path"));
new /** @class */ (function () {
    function Window() {
        electron_1.app.on("ready", function () {
            var window = new electron_1.BrowserWindow({
                width: 1200,
                height: 700
            });
            if (electron_is_dev_1.default) {
                window.loadURL("http://localhost:8080").then(function () { });
                return;
            }
            window.loadFile(path_1.default.join(__dirname, "")).then(function () { });
        });
    }
    return Window;
}());
