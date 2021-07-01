"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var packageJson = require("../../package.json");
var Packager = /** @class */ (function () {
    /**
     * Packager class
     * @param { PlexiUi } plexiUi PlexiUi class object
     */
    function Packager(plexiUi) {
        this.plexiUi = plexiUi;
    }
    /**
     * Run packager
     * @param { object } rawOptions Options
     * @param { CallableFunction } eventCallback Event callback
     */
    Packager.prototype.pack = function (rawOptions, eventCallback) {
        var _a;
        var time = 0;
        var timer = setInterval(function () {
            time++;
        }, 1000);
        var defaultOptions = {
            out: path_1.default.join(__dirname, "./vue/cache/build")
        };
        var options = Object.assign(defaultOptions, rawOptions);
        var renderPackagerProcess = child_process_1.exec("npx webpack --mode production");
        eventCallback({
            type: "status",
            data: {
                status: "starting",
                on: "renderer-pack",
                timeTaken: time,
                process: renderPackagerProcess
            }
        });
        (_a = renderPackagerProcess.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
            var _a;
            clearInterval(timer);
            eventCallback({
                type: "status",
                data: {
                    status: "ready",
                    on: "renderer-pack",
                    timeTaken: time,
                    process: renderPackagerProcess
                }
            });
            time = 0;
            timer = setInterval(function () {
                time++;
            }, 1000);
            packageJson.main = "./src/electron/Main.js";
            fs_1.default.writeFile(path_1.default.join(__dirname, "../../package.json"), JSON.stringify(packageJson), function (error) { });
            var packagerWinProcess = child_process_1.exec("npx electron-packager ./ --overwrite --platform=win32 --out=" + options.out, {
                cwd: path_1.default.join(__dirname, "../../")
            });
            eventCallback({
                type: "status",
                data: {
                    status: "starting",
                    on: "win-pack",
                    timeTaken: time,
                    process: packagerWinProcess
                }
            });
            (_a = packagerWinProcess.stderr) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                if (data.startsWith("Wrote new app to ")) {
                    clearInterval(timer);
                    eventCallback({
                        type: "status",
                        data: {
                            status: "ready",
                            on: "win-pack",
                            timeTaken: time,
                            process: packagerWinProcess
                        }
                    });
                    packageJson.main = "./src/PlexiUi.js";
                    fs_1.default.writeFile(path_1.default.join(__dirname, "../../package.json"), JSON.stringify(packageJson), function (error) { });
                }
            });
        });
    };
    return Packager;
}());
exports.default = Packager;
