"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
// @ts-ignore
var fs_extra_1 = __importDefault(require("fs-extra"));
var Renderer = /** @class */ (function () {
    /**
     * Class managing all processes of the renderer
     */
    function Renderer(plexiUi) {
        this.plexiUi = plexiUi;
        this.renderer = null;
        this.readyTriggered = false;
    }
    /**
     * Start resource copy
     * @param { Events } options Full set of options
     * @param { CallableFunction } callback Callback event listener
     */
    Renderer.prototype.startCopy = function (options, callback) {
        if (callback === void 0) { callback = function () { }; }
        var time = 0;
        var timer = setInterval(function () {
            time += 0.1;
        }, 100);
        callback({
            type: "status",
            data: {
                status: "starting",
                timeTaken: time
            }
        });
        fs_extra_1.default.copySync(options.renderDir, path_1.default.join(__dirname, "../renderer/render"), {
            overwrite: true
        }, function (error) {
            if (error) {
                clearInterval(timer);
                callback({
                    type: "status",
                    data: {
                        status: "error",
                        timeTaken: time,
                        dump: error
                    }
                });
                return;
            }
        });
        clearInterval(timer);
        callback({
            type: "status",
            data: {
                status: "ready",
                timeTaken: time
            }
        });
    };
    /**
     * Start the renderer process
     * @param { CallableFunction } callback Callback event listener
     * @return { this } Self
     */
    Renderer.prototype.startRenderer = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        var time = 0;
        var timer = setInterval(function () {
            time += 0.1;
        }, 100);
        var rendererProcess = child_process_1.spawn(path_1.default.join(__dirname, "../../node_modules/.bin/webpack.cmd"), ["serve", "--mode", "development", "--hot", "--port", "8080"]);
        callback({
            type: "status",
            data: {
                status: "starting",
                renderer: rendererProcess
            }
        });
        rendererProcess.stdout.on("data", function (data) {
            if (data.toString() == "\x1B[34mi\x1B[39m \x1B[90m｢wdm｣\x1B[39m: Compiled successfully.\n") {
                if (!_this.readyTriggered) {
                    _this.readyTriggered = true;
                    clearInterval(timer);
                    callback({
                        type: "status",
                        data: {
                            status: "ready",
                            renderer: rendererProcess,
                            timeTaken: Math.round(time)
                        }
                    });
                }
            }
        });
        rendererProcess.stderr.on("data", function (data) {
            clearInterval(timer);
            callback({
                type: "status",
                data: {
                    status: "error",
                    timeTaken: Math.round(time),
                    renderer: rendererProcess,
                    dump: data.toString()
                }
            });
        });
        return this;
    };
    return Renderer;
}());
exports.default = Renderer;
