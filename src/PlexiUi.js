"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var ProcessRunner_1 = __importDefault(require("./plexi-ui/ProcessRunner"));
var PlexiUi = /** @class */ (function () {
    /**
     * PlexiUi framework
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    function PlexiUi(rawOptions, callback) {
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
        var procedure = {
            runElectron: function (done) {
                processRunner.run("electron", options.runnerOptions, function (event) {
                    console.log("electron ready");
                });
                done();
            },
            runVue: function (done) {
                processRunner.run("vue", options.runnerOptions, function (event) {
                    console.log("vue ready");
                });
                done();
            }
        };
        if (!options.skip.vue) {
            procedure.runVue(function () {
            });
        }
        else {
            console.log("Vue event canceled");
        }
        if (!options.skip.electron) {
            procedure.runElectron(function () {
            });
        }
        else {
            console.log("Electron event canceled");
        }
    }
    return PlexiUi;
}());
exports.default = PlexiUi;
