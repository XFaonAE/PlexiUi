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
        window.loadURL("http://localhost:8280").then(function () { });
        app.on("browser-window-created", function () {
            console.log("ready");
        });
        ipcMain.on("closeWindow", function (event, args) {
            window.close();
        });
        ipcMain.on("sizeWindow", function (event, args) {
            if (window.isMaximized()) {
                window.restore();
                return;
            }
            window.maximize();
        });
        ipcMain.on("minimizeWindow", function (event, args) {
            window.minimize();
        });
    };
    return Window;
}());
