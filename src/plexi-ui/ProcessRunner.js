"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var electron_1 = __importDefault(require("electron"));
var child_process_1 = require("child_process");
var ProcessRunner = /** @class */ (function () {
    /**
     * Used for running framework component processes
     */
    function ProcessRunner() {
        this.processes = {
            vue: {
                main: path_1.default.join(__dirname, "../vue/Main.js")
            },
            electron: {
                main: path_1.default.join(__dirname, "../electron/Main.js")
            }
        };
    }
    /**
     * Run a component process
     * @param { string } processName Name of the process
     * @param { RunOptions } rawOptions Process run options
     * @param { CallableFunction } eventCallback Event callback
     */
    ProcessRunner.prototype.run = function (processName, rawOptions, eventCallback) {
        if (eventCallback === void 0) { eventCallback = function () { }; }
        var optionsDefault = {
            processes: this.processes
        };
        var options = Object.assign(optionsDefault, rawOptions);
        switch (processName.toLowerCase()) {
            case "vue":
                var webpackExe = path_1.default.join(require.resolve("module"));
                break;
            case "electron":
                var time_1 = 0;
                var timer_1 = setInterval(function () {
                    time_1++;
                }, 1000);
                var electronProcess = child_process_1.spawn(electron_1.default, [path_1.default.join(__dirname, "../electron/Main.js")]);
                eventCallback({
                    type: "status",
                    data: {
                        status: "starting",
                        timeTaken: time_1
                    }
                });
                electronProcess.stdout.on("data", function () {
                    clearInterval(timer_1);
                    eventCallback({
                        type: "status",
                        data: {
                            status: "ready",
                            timeTaken: time_1
                        }
                    });
                });
                break;
            default:
                throw new Error("[ " + processName + " ] is not a valid process");
        }
    };
    return ProcessRunner;
}());
exports.default = ProcessRunner;
