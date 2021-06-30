import path from "path";
import ProcessRunner, {ProcessEvent} from "./plexi-ui/ProcessRunner";
import PlexiCore from "@axeridev/plexi-core";

export interface ConstructorOptions {
    renderRoot: string;
    logStatus: boolean;
    runnerOptions: any;
    skip: {
        vue: boolean;
        electron: boolean;
    }
}

export interface ConstructorEvent {
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
    public callbackEvent: CallableFunction;

    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    public plexiCore: PlexiCore;

    /**
     * @var { ConstructorOptions } options Options
     */
    public options: ConstructorOptions;

    /**
     * PlexiUi framework
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    public constructor(rawOptions: object = {}, callback: CallableFunction = () => {}) {
        this.callbackEvent = callback;
        this.plexiCore = new PlexiCore();

        const optionsDefault: ConstructorOptions = {
            renderRoot: path.join(__dirname, "./vue/cache/defaultRender"),
            logStatus: true,
            runnerOptions: {},
            skip: {
                vue: false,
                electron: false
            }
        };

        const options: ConstructorOptions = Object.assign(optionsDefault, rawOptions);
        const processRunner = new ProcessRunner();
        this.options = options;

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
     * Log current status if allowed
     * @param { string } message Status message
     * @param { string } newState New state for spinner
     */
    public logStat(message: string | null = null, newState: string | null = null) {
        if (this.options.logStatus) {
            if (message) {
                this.plexiCore.terminal.animation.write(message);
            }

            if (newState) {
                this.plexiCore.terminal.animation.exitSpinner(newState);
            }
        }
    }
}