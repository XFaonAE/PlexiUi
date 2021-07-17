"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var plexi_core_terminal_1 = __importDefault(require("@axeridev/plexi-core-terminal"));
var BuildCommand = /** @class */ (function () {
    /**
     * Main method
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    function BuildCommand(commandHelper) {
        commandHelper.addCommand({
            trigger: "build",
            desc: "Build your application",
            onTrigger: function (args) {
                var quit = function () {
                    process.exit(0);
                };
                var timer = {
                    timer: null,
                    time: 0
                };
                var startTimer = function () {
                    timer.time = 0;
                    timer.timer = setInterval(function () {
                        timer.time++;
                    }, 1000);
                };
                var endTimer = function () {
                    clearInterval(timer.timer);
                    return timer.time + "s";
                };
                var plexiCoreTerminal = new plexi_core_terminal_1.default();
                plexiCoreTerminal.section("PlexiUI | Build");
                var compile = {
                    html: function (done) {
                        var _a;
                        var html = child_process_1.exec("npx vue-cli-service build", {
                            cwd: process.cwd()
                        });
                        var ready = false;
                        (_a = html.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                            if (!ready && data.startsWith(" DONE")) {
                                ready = true;
                                done();
                            }
                        });
                    },
                    win32: function (done) {
                        var _a, _b;
                        var win32 = child_process_1.exec("npx electron-builder --win ", {
                            cwd: process.cwd()
                        });
                        var ready = false;
                        var win32Stdout = function (data) {
                            if (!ready && data.startsWith("building block map")) {
                                ready = true;
                                done();
                            }
                        };
                        (_a = win32.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                            win32Stdout(data);
                        });
                        (_b = win32.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function (data) {
                            win32Stdout(data);
                        });
                    }
                };
                startTimer();
                plexiCoreTerminal.animation.animate("Compiling VueJS");
                compile.html(function () {
                    plexiCoreTerminal.animation.end("success", "Finished compiling VueJS after " + endTimer());
                    startTimer();
                    plexiCoreTerminal.animation.animate("Building for win32");
                    compile.win32(function () {
                        plexiCoreTerminal.animation.end("success", "Finished building for win32 after " + endTimer());
                        plexiCoreTerminal.write("Build finished");
                        quit();
                    });
                });
            }
        });
    }
    return BuildCommand;
}());
exports.default = BuildCommand;
