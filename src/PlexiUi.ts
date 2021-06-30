import path from "path";
import ProcessRunner, {ProcessEvent} from "./plexi-ui/ProcessRunner";

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
     * PlexiUi framework
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    public constructor(rawOptions: object = {}, callback: CallableFunction = () => {}) {
        this.callbackEvent = callback;

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

        const procedure: Procedure = {
            runElectron: (done: CallableFunction) => {
                processRunner.run("electron", options.runnerOptions, (event: ProcessEvent) => {
                    console.log("electron ready");
                });

                done();
            },
            runVue: (done: CallableFunction) => {
                processRunner.run("vue", options.runnerOptions, (event: ProcessEvent) => {
                    console.log("vue ready");
                });

                done();
            }
        }

        if (!options.skip.vue) {
            procedure.runVue(() => {
            });
        } else {
            console.log("Vue event canceled");
        }

        if (!options.skip.electron) {
            procedure.runElectron(() => {

            });
        } else {
            console.log("Electron event canceled");
        }
    }
}