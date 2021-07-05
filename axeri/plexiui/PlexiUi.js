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
var PlexiUi = /** @class */ (function () {
    /**
     * PlexiUi entry
     */
    function PlexiUi() {
        this.plexiCore = new PlexiCore_1.default();
        this.options = {
            windowMain: path_1.default.join(__dirname, "./window/Window.js"),
            mode: "dev"
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
        var _this = this;
        this.plexiCore.terminal.writeAnimation("Starting renderer...");
        setTimeout(function () {
            _this.plexiCore.terminal.endAnimation("success");
        }, 1500);
    };
    return PlexiUi;
}());
exports.default = PlexiUi;
