"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var electron_1 = __importDefault(require("electron"));
var path_1 = __importDefault(require("path"));
var Window = /** @class */ (function () {
    /**
     * Window process manager
     * @param { PlexiUi } plexiUi PlexiUi class object
     */
    function Window(plexiUi) {
        this.plexiUi = plexiUi;
    }
    /**
     * Start the window process
     * @param { CallableFunction } callback Callback for events
     */
    Window.prototype.startWindow = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        var time = 0;
        var timer = setInterval(function () {
            time += 0.1;
        }, 100);
        var windowProcess = child_process_1.spawn(electron_1.default + "", [path_1.default.join(__dirname, "../window/Window.js")]);
        callback({
            type: "status",
            data: {
                timeTaken: time,
                window: windowProcess,
                status: "starting"
            }
        });
        windowProcess.stdout.on("data", function () {
            clearInterval(timer);
            callback({
                type: "status",
                data: {
                    timeTaken: time,
                    window: windowProcess,
                    status: "ready"
                }
            });
        });
    };
    return Window;
}());
exports.default = Window;
