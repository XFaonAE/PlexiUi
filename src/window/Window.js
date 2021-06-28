"use strict";
var _a = require("electron"), ipcMain = _a.ipcMain, app = _a.app, BrowserWindow = _a.BrowserWindow;
new /** @class */ (function () {
    /**
     * Main ElectronJS script
     */
    function Window() {
        var _this = this;
        app.on("ready", function () {
            _this.createWindow();
        });
    }
    /**
     * Create the ElectronJS window
     */
    Window.prototype.createWindow = function () {
        var window = new BrowserWindow({
            width: 1500,
            height: 800,
            frame: false,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true
            }
        });
        window.loadURL("http://localhost:8080").then(function () { });
        app.on("browser-window-created", function () {
            console.log("ready");
        });
    };
    return Window;
}());
