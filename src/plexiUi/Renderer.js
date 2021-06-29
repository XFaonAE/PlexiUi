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
        var _a, _b;
        if (callback === void 0) { callback = function () { }; }
        var time = 0;
        var timer = setInterval(function () {
            time += 0.1;
        }, 100);
        var rendererProcess = child_process_1.exec("npx webpack serve --mode development --hot --port 8080", {
            cwd: path_1.default.join(__dirname, "../../")
        });
        callback({
            type: "status",
            data: {
                status: "starting",
                renderer: rendererProcess
            }
        });
        (_a = rendererProcess === null || rendererProcess === void 0 ? void 0 : rendererProcess.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
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
        (_b = rendererProcess === null || rendererProcess === void 0 ? void 0 : rendererProcess.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function (data) {
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
    /**
     * Attach all component change listeners
     * @param options Full framework options
     * @param { CallableFunction } callback Callback to trigger on events
     */
    Renderer.prototype.attachResourceEvent = function (options, callback) {
        if (callback === void 0) { callback = function () { }; }
        // fs.readdir(options.renderDir, (error: any, files: any) => {
        //     files.forEach((value: any, index: number) => {
        //         console.log(value)
        //         onFileChange(path.join(options.renderDir, value), () => {
        //             this.startCopy(options, (event: Events) => {
        //                 switch (event.type) {
        //                     case "status":
        //                         switch (event.data.status) {
        //                             case "starting":
        //                                 this.plexiUi.plexiCore.terminal.writeSpinner("Updating components...");
        //                                 break;
        //
        //                             case "ready":
        //                                 this.plexiUi.plexiCore.terminal.writeSpinner("Components updated after " + event.data.timeTaken + "s");
        //                                 this.plexiUi.plexiCore.terminal.exitSpinner("success");
        //                                 break;
        //                         }
        //                         break;
        //                 }
        //             });
        //         });
        //     });
        // });
    };
    return Renderer;
}());
exports.default = Renderer;
