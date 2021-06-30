"use strict";
var _a = require("electron"), BrowserWindow = _a.BrowserWindow, app = _a.app, ipcMain = _a.ipcMain;
var path = require("path");
new /** @class */ (function () {
    function Main() {
        app.on("ready", function () {
            var window = new BrowserWindow({
                width: 1400,
                height: 700,
                frame: false,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false
                }
            });
            if (process.env.NODE_ENV !== "production") {
                window.loadURL("http://localhost:8080").then(function () { });
                return;
            }
            window.loadFile(path.join(__dirname, "../vue/cache/build/index.html")).then(function () { });
        });
    }
    return Main;
}());
