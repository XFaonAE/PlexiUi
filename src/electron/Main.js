"use strict";
var _a = require("electron"), BrowserWindow = _a.BrowserWindow, app = _a.app, ipcMain = _a.ipcMain;
new /** @class */ (function () {
    function Main() {
        app.on("ready", function () {
            var window = new BrowserWindow({
                width: 1400,
                height: 700,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false
                }
            });
        });
    }
    return Main;
}());
