"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = __importDefault(require("electron"));
var child_process_1 = require("child_process");
var packageJson = require("../../../package.json");
var Dev = /** @class */ (function () {
    function Dev() {
    }
    /**
     * Run dev script
     * @param { Tasks } tasks Tasks class object
     */
    Dev.prototype.run = function (tasks) {
        var _this = this;
        var plexiCore = tasks.plexiUi.plexiCore;
        plexiCore.terminal.dividerCreate("PlexiUI | Dev");
        this.executeRenderer(function (event) {
            switch (event.status) {
                case "starting":
                    plexiCore.terminal.animation.write("Starting renderer");
                    break;
                case "ready":
                    plexiCore.terminal.animation.write("Renderer started after " + event.timeSpent + "s");
                    plexiCore.terminal.animation.exitSpinner("success");
                    _this.executeWindow(function (event) {
                        switch (event.status) {
                            case "starting":
                                plexiCore.terminal.animation.write("Starting window");
                                break;
                            case "ready":
                                plexiCore.terminal.animation.write("Window started after " + event.timeSpent + "s");
                                plexiCore.terminal.animation.exitSpinner("success");
                                break;
                            case "error":
                                plexiCore.terminal.animation.write("Failed to start window");
                                plexiCore.terminal.animation.exitSpinner("error");
                                break;
                        }
                    });
                    break;
                case "error":
                    plexiCore.terminal.animation.write("Failed to start renderer");
                    plexiCore.terminal.animation.exitSpinner("error");
                    break;
            }
        });
    };
    /**
     * Execute renderer process
     * @param { CallableFunction } eventCallback Event callback
     */
    Dev.prototype.executeRenderer = function (eventCallback) {
        var _a;
        if (eventCallback === void 0) { eventCallback = function () { }; }
        var time = 0;
        var timer = setInterval(function () {
            time++;
        }, 1000);
        eventCallback({
            status: "starting"
        });
        var rendererProcess = child_process_1.exec("npx vue-cli-service serve");
        var initialReady = false;
        (_a = rendererProcess.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
            if (data.startsWith(" DONE")) {
                if (!initialReady) {
                    initialReady = true;
                    clearInterval(timer);
                    eventCallback({
                        status: "ready",
                        timeSpent: time
                    });
                }
            }
        });
    };
    /**
     * Execute window process
     * @param { CallableFunction } eventCallback Event callback
     */
    Dev.prototype.executeWindow = function (eventCallback) {
        if (eventCallback === void 0) { eventCallback = function () { }; }
        var time = 0;
        var timer = setInterval(function () {
            time++;
        }, 1000);
        eventCallback({
            status: "starting"
        });
        var windowProcess = child_process_1.spawn(electron_1.default, [packageJson.main]);
        var initialReady = false;
        windowProcess.stdout.on("data", function (data) {
            if (!initialReady) {
                initialReady = true;
                clearInterval(timer);
                eventCallback({
                    status: "ready",
                    timeSpent: time
                });
            }
        });
        windowProcess.stderr.on("data", function (data) {
            if (!initialReady) {
                initialReady = true;
                eventCallback({
                    status: "error"
                });
            }
        });
    };
    return Dev;
}());
exports.default = Dev;
