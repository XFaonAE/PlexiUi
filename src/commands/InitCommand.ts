import PlexiCoreTerminal from "@axeridev/plexi-core-terminal";
import CommandHelper from "@axeridev/plexi-core-terminal/src/CommandHelper";
import * as fse from "fs-extra";
import * as path from "path";

export default class InitCommand {
    /**
     * Main method
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    public constructor(commandHelper: CommandHelper) {
        commandHelper.addCommand({
            trigger: "init",
            desc: "Initialize a new PlexiUi project",
            onTrigger: (args: Array<string>) => {
                const plexiCoreTerminal = new PlexiCoreTerminal();
                plexiCoreTerminal.section("PlexiUI | Initialize Project");

                const initProject = {
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
                            "@electron/remote": "^1.2.0",
                            "core-js": "^3.6.5",
                            "electron-is-dev": "^2.0.0",
                            "vue": "^3.0.0",
                            "vue-router": "^4.0.10",
                            "vuex": "^4.0.0-0"
                        },
                        devDependencies: {
                            "@vue/cli-plugin-babel": "~4.5.0",
                            "@vue/cli-plugin-router": "~4.5.0",
                            "@vue/cli-plugin-vuex": "~4.5.0",
                            "@vue/cli-service": "~4.5.0",
                            "@vue/compiler-sfc": "^3.0.0",
                            "electron": "^13.1.7",
                            "electron-builder": "^22.11.7",
                            "less": "^3.0.4",
                            "less-loader": "^5.0.0",
                            "typescript": "^4.3.5"
                        },
                        build: {
                            asar: false
                        }
                    }
                };

                const getProjectInfo = (finished: CallableFunction) => {
                    const ask = {
                        projectName: (done: CallableFunction) => {
                            plexiCoreTerminal.ask("Project Name [ plexi-ui-project ]", (data: string) => {
                                initProject.packageJson.name = data != "" ? data.toLowerCase() : "plexi-ui-project";
                                done();
                            });
                        },
                        desc: (done: CallableFunction) => {
                            plexiCoreTerminal.ask("Project Description [ PlexiUI Project ]", (data: string) => {
                                initProject.packageJson.description = data != "" ? data : "PlexiUI Project";
                                done();
                            });
                        },
                        author: (done: CallableFunction) => {
                            plexiCoreTerminal.ask("Author [ Unknown ]", (data: string) => {
                                initProject.packageJson.author = data != "" ? data : "Unknown";
                                done();
                            });
                        },
                        version: (done: CallableFunction) => {
                            plexiCoreTerminal.ask("Version [ 0.0.1 ]", (data: string) => {
                                initProject.packageJson.version = data != "" ? data : "0.0.1";
                                done();
                            });
                        },
                        keywords: (done: CallableFunction) => {
                            plexiCoreTerminal.ask("Keywords", (data: string) => {
                                initProject.packageJson.keywords = data != "" ? data.split(" ") : [];
                                done();
                            });
                        }
                    };

                    ask.projectName(() => {
                        ask.desc(() => {
                            ask.author(() => {
                                ask.version(() => {
                                    ask.keywords(() => {
                                        finished();
                                    });
                                });
                            });
                        });
                    });
                }

                getProjectInfo(() => {
                    plexiCoreTerminal.animation.animate("Creating project");

                    fse.copySync(path.join(__dirname, "./init/template/"), path.join(process.cwd(), "./"), {
                        overwrite: true
                    });

                    fse.writeFile(path.join(process.cwd(), "./package.json"), JSON.stringify(initProject.packageJson, null, 4), (error: any) => {
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
}