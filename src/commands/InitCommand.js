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
var fse = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var InitCommand = /** @class */ (function () {
    /**
     * Main method
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    function InitCommand(commandHelper) {
        commandHelper
            .addCommand({
            trigger: "init",
            desc: "Initialize a new PlexiUi project",
            onTrigger: function (args) {
                var plexiCoreTerminal = new plexi_core_terminal_1.default();
                var initProject = {
                    packageJson: {
                        main: "./src/electron/Electron.js",
                        description: "",
                        name: "",
                        version: "",
                        author: "",
                        scripts: {
                            "dev": "plexi-ui dev",
                            "build": "plexi-ui build"
                        },
                        keywords: [
                            ""
                        ],
                        dependencies: {
                            "core-js": "^3.6.5",
                            "vue": "^3.0.0",
                            "vue-router": "^4.0.0-0",
                            "vuex": "^4.0.0-0",
                            "electron": "^13.1.7",
                            "electron-is-dev": "^2.0.0"
                        },
                        devDependencies: {
                            "@vue/cli-plugin-babel": "~4.5.0",
                            "@vue/cli-plugin-router": "~4.5.0",
                            "@vue/cli-plugin-vuex": "~4.5.0",
                            "@vue/cli-service": "~4.5.0",
                            "@vue/compiler-sfc": "^3.0.0"
                        }
                    }
                };
                var getProjectInfo = function (finished) {
                    var ask = {
                        projectName: function (done) {
                            plexiCoreTerminal.ask("Project Name [ plexi-ui-project ]", function (data) {
                                initProject.packageJson.name = data != "" ? data.toLowerCase() : "plexi-ui-project";
                                done();
                            });
                        },
                        desc: function (done) {
                            plexiCoreTerminal.ask("Project Description [ PlexiUI Project ]", function (data) {
                                initProject.packageJson.description = data != "" ? data : "PlexiUI Project";
                                done();
                            });
                        },
                        author: function (done) {
                            plexiCoreTerminal.ask("Author [ Unknown ]", function (data) {
                                initProject.packageJson.author = data != "" ? data : "Unknown";
                                done();
                            });
                        },
                        version: function (done) {
                            plexiCoreTerminal.ask("Version [ 0.0.1 ]", function (data) {
                                initProject.packageJson.version = data != "" ? data : "0.0.1";
                                done();
                            });
                        },
                        keywords: function (done) {
                            plexiCoreTerminal.ask("Keywords", function (data) {
                                initProject.packageJson.keywords = data != "" ? data.split(" ") : [];
                                done();
                            });
                        }
                    };
                    ask.projectName(function () {
                        ask.desc(function () {
                            ask.author(function () {
                                ask.version(function () {
                                    ask.keywords(function () {
                                        finished();
                                    });
                                });
                            });
                        });
                    });
                };
                getProjectInfo(function () {
                    plexiCoreTerminal.animation.animate("Creating project");
                    fse.copySync(path.join(__dirname, "./init/template/"), path.join(process.cwd(), "./"), {
                        overwrite: true
                    });
                    fse.writeFile(path.join(process.cwd(), "./package.json"), JSON.stringify(initProject.packageJson, null, 2), function (error) {
                        error ? console.log(error) : null;
                        plexiCoreTerminal.animation.end("success", "Project created!");
                        plexiCoreTerminal.write("Get Started!");
                        plexiCoreTerminal.row("npm install", "Install the frameworks components");
                        plexiCoreTerminal.row("npm run dev", "Start a development server");
                    });
                    plexiCoreTerminal.rl.close();
                });
            }
        });
    }
    return InitCommand;
}());
exports.default = InitCommand;
