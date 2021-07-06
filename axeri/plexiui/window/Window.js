"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
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
            if (isDev) {
                _this.window.loadURL("http://localhost:8080").then(function () {
                    _this.attachIpc();
                });
                return;
            }
            _this.window.loadFile(path_1.default.join(__dirname, "../renderer/build/index.html")).then(function () {
                _this.attachIpc();
            });
        });
    }
    /**
     * Attach IPC
     */
    Window.prototype.attachIpc = function () {
        var _this = this;
        electron_1.ipcMain.on("windowSize", function (event, args) {
            var _a, _b, _c;
            if ((_a = _this.window) === null || _a === void 0 ? void 0 : _a.isMaximized()) {
                (_b = _this.window) === null || _b === void 0 ? void 0 : _b.restore();
                return;
            }
            (_c = _this.window) === null || _c === void 0 ? void 0 : _c.maximize();
        });
        electron_1.ipcMain.on("windowMinimize", function (event, args) {
            var _a;
            (_a = _this.window) === null || _a === void 0 ? void 0 : _a.minimize();
        });
    };
    return Window;
}());
