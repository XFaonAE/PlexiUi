"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var electron_1 = __importDefault(require("electron"));
var Process = /** @class */ (function () {
    function Process() {
    }
    /**
     * Run a core processes
     * @param { "renderer" | "window" | "packageRenderer | "packageWin32 } processName Name of the process to run
     * @param { CallableFunction } eventCallback Callback for all events
     */
    Process.prototype.run = function (processName, eventCallback) {
        var _a, _b, _c, _d, _e, _f;
        var time = 0;
        var timer = setInterval(function () {
            time++;
        }, 1000);
        var ready = false;
        switch (processName) {
            case "renderer":
                var renderer_1 = child_process_1.exec("npx vue-cli-service serve", {
                    cwd: path_1.default.join(__dirname, "../../../../")
                });
                ready = false;
                (_a = renderer_1.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                    if (!ready) {
                        if (data.startsWith(" DONE")) {
                            ready = true;
                            clearInterval(timer);
                            eventCallback({
                                status: "done",
                                after: time + "s",
                                process: renderer_1
                            });
                        }
                    }
                });
                (_b = renderer_1.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function (data) {
                    var _a;
                    eventCallback({
                        status: "progress",
                        percent: ((_a = data.match(/<s> \[webpack.Progress\] (.+?) (.??)/)) === null || _a === void 0 ? void 0 : _a[1]),
                        time: time
                    });
                });
                break;
            case "window":
                var window_1 = child_process_1.spawn(electron_1.default, [
                    "./"
                ]);
                ready = false;
                (_c = window_1.stdout) === null || _c === void 0 ? void 0 : _c.on("data", function (data) {
                    if (!ready) {
                        ready = true;
                        clearInterval(timer);
                        eventCallback({
                            status: "done",
                            process: window_1,
                            after: time + "s"
                        });
                    }
                });
                break;
            case "packageRenderer":
                var rendererPackager_1 = child_process_1.exec("npx vue-cli-service build", {
                    cwd: path_1.default.join(__dirname, "../../../../")
                });
                ready = false;
                (_d = rendererPackager_1.stdout) === null || _d === void 0 ? void 0 : _d.on("data", function (data) {
                    if (!ready) {
                        if (data.startsWith(" DONE")) {
                            ready = true;
                            clearInterval(timer);
                            eventCallback({
                                status: "done",
                                after: time + "s",
                                process: rendererPackager_1
                            });
                        }
                    }
                });
                break;
            case "packageWin32":
                var win32Packager_1 = child_process_1.exec("npx electron-builder --win", {
                    cwd: path_1.default.join(__dirname, "../../../../")
                });
                ready = false;
                (_e = win32Packager_1.stdout) === null || _e === void 0 ? void 0 : _e.on("data", function (data) {
                    if (!ready) {
                        if (data.startsWith("building block map")) {
                            ready = true;
                            clearInterval(timer);
                            eventCallback({
                                status: "done",
                                after: time + "s",
                                process: win32Packager_1
                            });
                        }
                    }
                });
                (_f = win32Packager_1.stderr) === null || _f === void 0 ? void 0 : _f.on("data", function (data) {
                    console.log(data);
                });
                break;
        }
    };
    return Process;
}());
exports.default = Process;
