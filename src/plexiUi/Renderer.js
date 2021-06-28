"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var Renderer = /** @class */ (function () {
    /**
     * Class managing all processes of the renderer
     */
    function Renderer() {
        this.renderer = null;
        this.startRenderer({}, function (event) {
            console.log(event);
        });
    }
    /**
     * Start the renderer process
     * @param { object } rawOptions Any startup options
     * @param { CallableFunction } callback Callback event listener
     * @return { this } Self
     */
    Renderer.prototype.startRenderer = function (rawOptions, callback) {
        if (rawOptions === void 0) { rawOptions = {}; }
        if (callback === void 0) { callback = null; }
        var rendererProcess = child_process_1.spawn(path_1.default.join(__dirname, "../../node_modules/.bin/webpack.cmd"), ["serve", "--mode", "development", "--hot"]);
        rendererProcess.stdout.on("data", function (data) {
            if (data.toString() == "\x1B[34mi\x1B[39m \x1B[90m｢wdm｣\x1B[39m: Compiled successfully.\n") {
                callback ? ({
                    type: "status",
                    data: {}
                }) : ;
            }
        });
        return this;
    };
    return Renderer;
}());
exports.default = Renderer;
