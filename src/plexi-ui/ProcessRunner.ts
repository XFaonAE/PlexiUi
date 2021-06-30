import path from "path";
import electron from "electron";
import { spawn } from "child_process";

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
    data: any;
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
                const webpackExe = path.join(require.resolve("module"))
                break;

            case "electron":
                let time = 0;
                let timer = setInterval(() => {
                    time++;
                }, 1000);

                const electronProcess = spawn(<string><unknown>electron, [path.join(__dirname, "../electron/Main.js")]);
                eventCallback({
                    type: "status",
                    data: {
                        status: "starting",
                        timeTaken: time
                    }
                });

                electronProcess.stdout.on("data", () => {
                    clearInterval(timer);
                    eventCallback({
                        type: "status",
                        data: {
                            status: "ready",
                            timeTaken: time
                        }
                    });
                });
                break;

            default:
                throw new Error("[ " + processName + " ] is not a valid process");
        }
    }
}