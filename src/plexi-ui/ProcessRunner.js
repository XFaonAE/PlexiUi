"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
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
                console.log(options.processes.vue);
                break;
            case "electron":
                console.log(options.processes.electron);
                break;
            default:
                throw new Error("[ " + processName + " ] is not a valid process");
        }
        eventCallback();
    };
    return ProcessRunner;
}());
exports.default = ProcessRunner;
