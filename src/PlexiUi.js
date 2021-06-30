"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var ProcessRunner_1 = __importDefault(require("./plexi-ui/ProcessRunner"));
var plexi_core_1 = __importDefault(require("@axeridev/plexi-core"));
var child_process_1 = require("child_process");
var PlexiUi = /** @class */ (function () {
    /**
     * PlexiUi framework
     */
    function PlexiUi() {
        this.plexiCore = new plexi_core_1.default();
    }
    /**
     * PlexiUi framework dev runner
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    PlexiUi.prototype.dev = function (rawOptions, callback) {
        var _this = this;
        if (rawOptions === void 0) { rawOptions = {}; }
        if (callback === void 0) { callback = function () { }; }
        this.callbackEvent = callback;
        var optionsDefault = {
            renderRoot: path_1.default.join(__dirname, "./vue/cache/defaultRender"),
            logStatus: true,
            runnerOptions: {},
            skip: {
                vue: false,
                electron: false
            }
        };
        var options = Object.assign(optionsDefault, rawOptions);
        var processRunner = new ProcessRunner_1.default();
        this.options = options;
        if (options.logStatus) {
            this.plexiCore.terminal.dividerCreate("PlexiUi | Development");
        }
        var procedure = {
            runElectron: function (done) {
                if (done === void 0) { done = function () { }; }
                processRunner.run("electron", options.runnerOptions, function (event) {
                    switch (event.type) {
                        case "status":
                            switch (event.data.status) {
                                case "starting":
                                    _this.logStat("Starting window process...");
                                    break;
                                case "ready":
                                    _this.logStat("Window process is ready after " + event.data.timeTaken + "s", "success");
                                    done();
                                    break;
                            }
                            break;
                    }
                });
            },
            runVue: function (done) {
                if (done === void 0) { done = function () { }; }
                processRunner.run("vue", options.runnerOptions, function (event) {
                    switch (event.type) {
                        case "status":
                            switch (event.data.status) {
                                case "starting":
                                    _this.logStat("Starting renderer engine...");
                                    break;
                                case "ready":
                                    _this.logStat("Renderer engine is ready after " + event.data.timeTaken + "s", "success");
                                    done();
                                    break;
                                case "error":
                                    console.error(event.data.dump);
                                    break;
                            }
                            break;
                    }
                });
            }
        };
        if (!options.skip.vue) {
            procedure.runVue(function () {
                if (!options.skip.electron) {
                    procedure.runElectron();
                }
                else {
                    _this.logStat("Skipping window process", "warning");
                }
            });
        }
        else {
            this.logStat("Skipping renderer engine", "warning");
            if (!options.skip.electron) {
                procedure.runElectron();
            }
            else {
                this.logStat("Skipping window process", "warning");
            }
        }
    };
    /**
     * Package application
     * @param { object } rawOptions Options
     */
    PlexiUi.prototype.package = function (rawOptions) {
        var _this = this;
        var _a;
        if (rawOptions === void 0) { rawOptions = {}; }
        var time = 0;
        var timer = setInterval(function () {
            time++;
        }, 1000);
        var defaultOptions = {
            out: path_1.default.join(__dirname, "./vue/cache/build")
        };
        var options = Object.assign(defaultOptions, rawOptions);
        this.plexiCore.terminal.dividerCreate("PlexiUi | Packager");
        this.plexiCore.terminal.animation.write("Compiling renderer resources...");
        var renderPackagerProcess = child_process_1.exec("npx webpack --mode production");
        (_a = renderPackagerProcess.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
            var _a;
            clearInterval(timer);
            _this.plexiCore.terminal.animation.write("Finished compiling renderer after " + time + "s");
            _this.plexiCore.terminal.animation.exitSpinner("success");
            time = 0;
            timer = setInterval(function () {
                time++;
            }, 1000);
            _this.plexiCore.terminal.animation.write("Writing package for win32");
            var packagerProcess = child_process_1.exec("npx electron-packager ./ --overwrite --platform=win32 --out=" + options.out, {
                cwd: path_1.default.join(__dirname, "../")
            });
            (_a = packagerProcess.stderr) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                if (data.startsWith("Wrote new app to ")) {
                    clearInterval(timer);
                    _this.plexiCore.terminal.animation.write("Finished writing package for win32 after " + time + "s");
                    _this.plexiCore.terminal.animation.exitSpinner("success");
                    _this.exit();
                }
            });
        });
    };
    /**
     * Log current status if allowed
     * @param { string } message Status message
     * @param { string } newState New state for spinner
     */
    PlexiUi.prototype.logStat = function (message, newState) {
        var _a;
        if (message === void 0) { message = null; }
        if (newState === void 0) { newState = null; }
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.logStatus) {
            if (message) {
                this.plexiCore.terminal.animation.write(message);
            }
            if (newState) {
                this.plexiCore.terminal.animation.exitSpinner(newState);
            }
        }
    };
    /**
     * Exit framework
     */
    PlexiUi.prototype.exit = function () {
        this.plexiCore.terminal.dividerCreate("PlexiUi | Exiting");
        process.exit(0);
    };
    return PlexiUi;
}());
exports.default = PlexiUi;
