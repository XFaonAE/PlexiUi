"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plexi_core_terminal_1 = __importDefault(require("@axeridev/plexi-core-terminal"));
var child_process_1 = require("child_process");
var path = __importStar(require("path"));
var DevCommand = /** @class */ (function () {
    /**
     * Main method
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    function DevCommand(commandHelper) {
        commandHelper.addCommand({
            trigger: "dev",
            desc: "Run the application in development mode",
            onTrigger: function (args) {
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
                plexiCoreTerminal.section("PlexiUI | Development Server");
                var processes = [];
                var quit = function () {
                    plexiCoreTerminal.write("Stopping development server");
                    processes.forEach(function (value) {
                        value.kill();
                    });
                    process.exit(0);
                };
                var tasks = {
                    vue: function (done) {
                        var vue = child_process_1.spawn(path.join(process.cwd(), "./node_modules/.bin/vue-cli-service.cmd"), [
                            "serve"
                        ]);
                        var ready = false;
                        vue.stdout.setEncoding("utf8");
                        vue.stderr.setEncoding("utf8");
                        vue.stdout.on("data", function (data) {
                            if (!ready && data.startsWith(" DONE")) {
                                ready = true;
                                processes.push(vue);
                                done();
                            }
                        });
                        vue.stderr.on("data", function (data) {
                            if (!ready && data.startsWith(" DONE")) {
                                ready = true;
                                processes.push(vue);
                                done();
                            }
                        });
                    },
                    electron: function (done) {
                        var electron = child_process_1.spawn(path.join(process.cwd(), "./node_modules/.bin/electron.cmd"), [
                            "./"
                        ]);
                        var ready = false;
                        electron.stdout.setEncoding("utf8");
                        electron.stdout.on("data", function (data) {
                            if (!ready && data == "view-ready\n") {
                                ready = true;
                                processes.push(electron);
                                done();
                                return;
                            }
                            if (data == "view-failed\n") {
                                plexiCoreTerminal.animation.end("error", "ElectronJS failed to load the view contents");
                            }
                        });
                        electron.on("exit", function () {
                            quit();
                        });
                    }
                };
                startTimer();
                plexiCoreTerminal.animation.animate("Starting VueJS");
                tasks.vue(function () {
                    plexiCoreTerminal.animation.end("success", "VueJS is ready after " + endTimer());
                    startTimer();
                    plexiCoreTerminal.animation.animate("Starting ElectronJS");
                    tasks.electron(function () {
                        plexiCoreTerminal.animation.end("success", "ElectronJS is ready after " + endTimer());
                        plexiCoreTerminal.write("The application is ready and running in development mode");
                    });
                });
            }
        });
    }
    return DevCommand;
}());
exports.default = DevCommand;
