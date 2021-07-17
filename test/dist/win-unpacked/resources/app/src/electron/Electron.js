"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var electron_1 = require("electron");
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
var path = __importStar(require("path"));
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
            width: 1000,
            height: 500,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        electron_1.ipcMain.on("system:isDark", function (event, args) {
            event.reply("system:isDark.reply", electron_1.nativeTheme.shouldUseDarkColors);
        });
        electron_1.nativeTheme.on("updated", function () {
            browserWindow.webContents.send("system:themeUpdated");
        });
        electron_1.ipcMain.on("electron:stop", function (event, arg) {
            browserWindow.close();
            electron_1.app.exit();
        });
        electron_1.ipcMain.on("electron:size", function (event, arg) {
            if (browserWindow.isMaximized()) {
                browserWindow.restore();
                return;
            }
            browserWindow.maximize();
        });
        electron_1.ipcMain.on("electron:minimize", function (event, arg) {
            browserWindow.minimize();
        });
        if (electron_is_dev_1.default) {
            browserWindow.loadURL("http://localhost:8080").then(function () {
                console.log("view-ready");
            }).catch(function () {
                console.log("view-failed");
            });
            browserWindow.on("closed", function () {
                console.log("window-closed");
            });
            return;
        }
        browserWindow.loadFile(path.join(__dirname, "./../build/html/index.html")).then(function () { });
    };
    return Electron;
}());
