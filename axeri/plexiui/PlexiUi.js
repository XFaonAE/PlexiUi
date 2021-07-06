"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var PlexiCore_1 = __importDefault(require("../plexicore/PlexiCore"));
var Process_1 = __importDefault(require("./core/process/Process"));
var PlexiUi = /** @class */ (function () {
    /**
     * PlexiUi entry
     */
    function PlexiUi() {
        this.plexiCore = new PlexiCore_1.default();
        this.options = {
            windowMain: path_1.default.join(__dirname, "./window/Window.js"),
            mode: "dev",
            skip: {
                renderer: false,
                window: false
            }
        };
    }
    /**
     * Set the options
     * @param { RunOptions } options Run options
     */
    PlexiUi.prototype.setOptions = function (options) {
        this.options = __assign(__assign({}, this.options), options);
    };
    /**
     * Run framework
     */
    PlexiUi.prototype.run = function () {
        var plexiCore = this.plexiCore;
        var options = this.options;
        var process = new Process_1.default();
        var tasks = {
            startRenderer: function (doneEvent) {
                var _a;
                if ((_a = options.skip) === null || _a === void 0 ? void 0 : _a.renderer) {
                    plexiCore.terminal.done("warning", "Skipping renderer process");
                    doneEvent();
                }
                else {
                    plexiCore.terminal.writeAnimation("Starting renderer");
                    process.run("renderer", function (event) {
                        switch (event.status) {
                            case "done":
                                plexiCore.terminal.done("success", "Renderer started after " + event.after);
                                doneEvent();
                                break;
                        }
                    });
                }
            },
            startWindow: function (doneEvent) {
                var _a;
                if ((_a = options.skip) === null || _a === void 0 ? void 0 : _a.window) {
                    plexiCore.terminal.done("warning", "Skipping window process");
                    doneEvent();
                }
                else {
                    plexiCore.terminal.writeAnimation("Starting window");
                    process.run("window", function (event) {
                        switch (event.status) {
                            case "done":
                                plexiCore.terminal.done("success", "Window started after " + event.after);
                                doneEvent();
                                break;
                        }
                    });
                }
            }
        };
        tasks.startRenderer(function () {
            tasks.startWindow(function () { });
        });
    };
    return PlexiUi;
}());
exports.default = PlexiUi;
