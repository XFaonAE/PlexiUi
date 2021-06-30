"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var electron_1 = __importDefault(require("electron"));
var ncp_1 = require("ncp");
var child_process_1 = require("child_process");
var chokidar_1 = __importDefault(require("chokidar"));
var ProcessRunner = /** @class */ (function () {
    /**
     * Used for running framework component processes
     */
    function ProcessRunner(plexiUi) {
        this.plexiUi = plexiUi;
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
        var _this = this;
        var _a, _b;
        if (eventCallback === void 0) { eventCallback = function () { }; }
        var optionsDefault = {
            processes: this.processes
        };
        var options = Object.assign(optionsDefault, rawOptions);
        var ready = false;
        switch (processName.toLowerCase()) {
            case "vue":
                {
                    var time_1 = 0;
                    var timer_1 = setInterval(function () {
                        time_1++;
                    }, 1000);
                    var updateResources = function () {
                        var _a;
                        ncp_1.ncp((_a = _this.plexiUi.options) === null || _a === void 0 ? void 0 : _a.renderRoot, path_1.default.join(__dirname, "../vue/cache/render"), function (error) { });
                    };
                    updateResources();
                    var vueProcess_1 = child_process_1.exec("npx webpack serve --mode development --hot", {
                        cwd: path_1.default.join(__dirname, "../../")
                    });
                    eventCallback({
                        type: "status",
                        data: {
                            status: "starting",
                            timeTaken: time_1,
                            process: vueProcess_1
                        }
                    });
                    (_a = vueProcess_1.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                        console.log(data);
                        if (!ready) {
                            if (data == "\x1B[34mi\x1B[39m \x1B[90m｢wdm｣\x1B[39m: Compiled successfully.\n") {
                                ready = true;
                                clearInterval(timer_1);
                                eventCallback({
                                    type: "status",
                                    data: {
                                        status: "ready",
                                        process: vueProcess_1,
                                        timeTaken: time_1
                                    }
                                });
                            }
                        }
                    });
                    (_b = vueProcess_1.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function (data) {
                        if (!ready) {
                            eventCallback({
                                type: "status",
                                data: {
                                    status: "error",
                                    process: vueProcess_1,
                                    timeTaken: time_1,
                                    dump: data
                                }
                            });
                        }
                    });
                }
                break;
            case "electron":
                {
                    var time_2 = 0;
                    var timer_2 = setInterval(function () {
                        time_2++;
                    }, 1000);
                    var electronProcess_1 = child_process_1.spawn(electron_1.default, [path_1.default.join(__dirname, "../electron/Main.js")]);
                    eventCallback({
                        type: "status",
                        data: {
                            status: "starting",
                            timeTaken: time_2,
                            process: electronProcess_1
                        }
                    });
                    electronProcess_1.stdout.on("data", function () {
                        var _a;
                        clearInterval(timer_2);
                        eventCallback({
                            type: "status",
                            data: {
                                status: "ready",
                                timeTaken: time_2,
                                process: electronProcess_1
                            }
                        });
                        var fileWatcher = chokidar_1.default.watch((_a = _this.plexiUi.options) === null || _a === void 0 ? void 0 : _a.renderRoot, {
                            ignored: /^\./, persistent: true
                        });
                        var updateResources = function () {
                            var _a;
                            ncp_1.ncp((_a = _this.plexiUi.options) === null || _a === void 0 ? void 0 : _a.renderRoot, path_1.default.join(__dirname, "../vue/cache/render"), function (error) { });
                        };
                        fileWatcher.on("add", function (path) {
                            updateResources();
                        }).on("change", function (path) {
                            updateResources();
                        }).on("unlink", function (path) {
                            updateResources();
                        });
                    });
                }
                break;
            default:
                throw new Error("[ " + processName + " ] is not a valid process");
        }
    };
    return ProcessRunner;
}());
exports.default = ProcessRunner;
