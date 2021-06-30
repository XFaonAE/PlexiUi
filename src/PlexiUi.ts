import path from "path";
import ProcessRunner, {ProcessEvent} from "./plexi-ui/ProcessRunner";
import PlexiCore from "@axeridev/plexi-core";
import { exec } from "child_process";

export interface DevOptions {
    renderRoot: string;
    logStatus: boolean;
    runnerOptions: any;
    skip: {
        vue: boolean;
        electron: boolean;
    }
}

export interface PackageOptions {
    out: string;
}

export interface DevEvent {
    type: string;
}

export interface Procedure {
    runElectron: CallableFunction;
    runVue: CallableFunction;
}

export default class PlexiUi {
    /**
     * @var { CallableFunction } callbackEvent On event callback
     */
    public callbackEvent: CallableFunction | undefined;

    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    public plexiCore: PlexiCore;

    /**
     * @var { DevOptions } options Options
     */
    public options: DevOptions | undefined;

    /**
     * PlexiUi framework
     */
    public constructor() {
        this.plexiCore = new PlexiCore();
    }

    /**
     * PlexiUi framework dev runner
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    public dev(rawOptions: object = {}, callback: CallableFunction = () => {}) {
        this.callbackEvent = callback;

        const optionsDefault: DevOptions = {
            renderRoot: path.join(__dirname, "./vue/cache/defaultRender"),
            logStatus: true,
            runnerOptions: {},
            skip: {
                vue: false,
                electron: false
            }
        };

        const options: DevOptions = Object.assign(optionsDefault, rawOptions);
        const processRunner = new ProcessRunner();
        this.options = options;

        if (options.logStatus) {
            this.plexiCore.terminal.dividerCreate("PlexiUi | Development");
        }

        const procedure: Procedure = {
            runElectron: (done: CallableFunction = () => {}) => {
                processRunner.run("electron", options.runnerOptions, (event: ProcessEvent) => {
                    switch (event.type) {
                        case "status":
                            switch (event.data.status) {
                                case "starting":
                                    this.logStat("Starting window process...");
                                    break;

                                case "ready":
                                    this.logStat("Window process is ready after " + event.data.timeTaken + "s", "success");
                                    done();
                                    break;
                            }
                            break;
                    }
                });
            },
            runVue: (done: CallableFunction = () => {}) => {
                processRunner.run("vue", options.runnerOptions, (event: ProcessEvent) => {
                    switch (event.type) {
                        case "status":
                            switch (event.data.status) {
                                case "starting":
                                    this.logStat("Starting renderer engine...");
                                    break;

                                case "ready":
                                    this.logStat("Renderer engine is ready after " + event.data.timeTaken + "s", "success");
                                    done();
                                    break;

                                case "error":
                                    console.error(event.data.dump);
                                    break;
                            }
                            break;
                    }
                });
            }
        }

        if (!options.skip.vue) {
            procedure.runVue(() => {
                if (!options.skip.electron) {
                    procedure.runElectron();
                } else {
                    this.logStat("Skipping window process", "warning");
                }
            });
        } else {
            this.logStat("Skipping renderer engine", "warning");
            if (!options.skip.electron) {
                procedure.runElectron();
            } else {
                this.logStat("Skipping window process", "warning");
            }
        }
    }

    /**
     * Package application
     * @param { object } rawOptions Options
     */
    public package(rawOptions: object = {}) {
        let time = 0;
        let timer = setInterval(() => {
            time++;
        }, 1000);

        const defaultOptions: PackageOptions = {
            out: path.join(__dirname, "./vue/cache/build")
        };
        const options: PackageOptions = Object.assign(defaultOptions, rawOptions);

        this.plexiCore.terminal.dividerCreate("PlexiUi | Packager");
        this.plexiCore.terminal.animation.write("Compiling renderer resources...");

        const renderPackagerProcess = exec("npx webpack --mode production");
        renderPackagerProcess.stdout?.on("data", (data: string) => {
            clearInterval(timer);
            this.plexiCore.terminal.animation.write("Finished compiling renderer after " + time + "s");
            this.plexiCore.terminal.animation.exitSpinner("success");

            time = 0;
            timer = setInterval(() => {
                time++;
            }, 1000);

            this.plexiCore.terminal.animation.write("Writing package for win32");

            const packagerProcess = exec("npx electron-packager ./ --overwrite --platform=win32 --out=" + options.out, {
                cwd: path.join(__dirname, "../")
            });

            packagerProcess.stderr?.on("data", (data: string) => {
                if (data.startsWith("Wrote new app to ")) {
                    clearInterval(timer);
                    this.plexiCore.terminal.animation.write("Finished writing package for win32 after " + time + "s");
                    this.plexiCore.terminal.animation.exitSpinner("success");

                    this.exit();
                }
            });
        });
    }

    /**
     * Log current status if allowed
     * @param { string } message Status message
     * @param { string } newState New state for spinner
     */
    public logStat(message: string | null = null, newState: string | null = null) {
        if (this.options?.logStatus) {
            if (message) {
                this.plexiCore.terminal.animation.write(message);
            }

            if (newState) {
                this.plexiCore.terminal.animation.exitSpinner(newState);
            }
        }
    }

    /**
     * Exit framework
     */
    public exit() {
        this.plexiCore.terminal.dividerCreate("PlexiUi | Exiting");
        process.exit(0);
    }
}