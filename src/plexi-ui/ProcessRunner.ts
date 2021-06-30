import path from "path";

export interface Processes {
    vue: {
        main: string;
    };
    electron: {
        main: string;
    };
}

export interface RunOptions {
    processes: Processes;
}

export interface  ProcessEvent {
    type: string;
}

export default class ProcessRunner {
    /**
     * @var { Processes } processes Processes list
     */
    public processes: Processes;

    /**
     * Used for running framework component processes
     */
    public constructor() {
        this.processes = {
            vue: {
                main: path.join(__dirname, "../vue/Main.js")
            },
            electron: {
                main: path.join(__dirname, "../electron/Main.js")
            }
        }
    }

    /**
     * Run a component process
     * @param { string } processName Name of the process
     * @param { RunOptions } rawOptions Process run options
     * @param { CallableFunction } eventCallback Event callback
     */
    public run(processName: string, rawOptions: any, eventCallback: CallableFunction = () => {}) {
        const optionsDefault: RunOptions = {
            processes: this.processes
        }

        const options: RunOptions = Object.assign(optionsDefault, rawOptions);

        switch (processName.toLowerCase()) {
            case "vue":
                console.log(options.processes.vue);
                break;

            case "electron":
                console.log(options.processes.electron);
                break;

            default:
                throw new Error("[ " + processName + " ] is not a valid process");
        }

        eventCallback();
    }
}