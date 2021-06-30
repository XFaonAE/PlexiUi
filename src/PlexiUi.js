"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var ProcessRunner_1 = __importDefault(require("./plexi-ui/ProcessRunner"));
var plexi_core_1 = __importDefault(require("@axeridev/plexi-core"));
var PlexiUi = /** @class */ (function () {
    /**
     * PlexiUi framework
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    function PlexiUi(rawOptions, callback) {
        var _this = this;
        if (rawOptions === void 0) { rawOptions = {}; }
        if (callback === void 0) { callback = function () { }; }
        this.callbackEvent = callback;
        this.plexiCore = new plexi_core_1.default();
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
    }
    /**
     * Log current status if allowed
     * @param { string } message Status message
     * @param { string } newState New state for spinner
     */
    PlexiUi.prototype.logStat = function (message, newState) {
        if (message === void 0) { message = null; }
        if (newState === void 0) { newState = null; }
        if (this.options.logStatus) {
            if (message) {
                this.plexiCore.terminal.animation.write(message);
            }
            if (newState) {
                this.plexiCore.terminal.animation.exitSpinner(newState);
            }
        }
    };
    return PlexiUi;
}());
exports.default = PlexiUi;
