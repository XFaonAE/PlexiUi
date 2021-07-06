"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var Process = /** @class */ (function () {
    function Process() {
    }
    /**
     * Run a core processes
     * @param { "renderer" | "window" } processName Name of the process to run
     * @param { CallableFunction } eventCallback Callback for all events
     */
    Process.prototype.run = function (processName, eventCallback) {
        var _a, _b;
        var time = 0;
        var timer = setInterval(function () {
            time++;
        }, 1000);
        switch (processName) {
            case "renderer":
                var renderer_1 = child_process_1.exec("npx vue-cli-service serve", {
                    cwd: path_1.default.join(__dirname, "../../../../")
                });
                var ready = false;
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
                break;
            case "window":
                var window_1 = child_process_1.exec("npx electron ./", {
                    cwd: path_1.default.join(__dirname, "../../../../")
                });
                var ready = false;
                (_b = window_1.stdout) === null || _b === void 0 ? void 0 : _b.on("data", function (data) {
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
        }
    };
    return Process;
}());
exports.default = Process;
