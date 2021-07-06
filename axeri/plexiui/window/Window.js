"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
new /** @class */ (function () {
    /**
     * Window constructor
     */
    function Window() {
        var _this = this;
        electron_1.app.on("ready", function () {
            _this.window = new electron_1.BrowserWindow({
                width: 1200,
                height: 700,
                frame: false,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    webviewTag: true
                }
            });
            _this.window.loadURL("http://localhost:8080");
            electron_1.ipcMain.on("windowSize", function (event, args) {
                if (_this.window.isMaximized()) {
                    _this.window.restore();
                    return;
                }
                _this.window.maximize();
            });
            electron_1.ipcMain.on("windowMinimize", function (event, args) {
                _this.window.minimize();
            });
        });
    }
    return Window;
}());
