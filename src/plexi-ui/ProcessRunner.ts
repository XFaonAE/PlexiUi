import path from "path";
import electron from "electron";
import { spawn, exec } from "child_process";

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
        let ready: boolean = false;

        switch (processName.toLowerCase()) {
            case "vue":
                {
                    let time = 0;
                    let timer = setInterval(() => {
                        time++;
                    }, 1000);

                    const vueProcess = exec("npx webpack serve --mode development --hot", {
                        cwd: path.join(__dirname, "../../")
                    });
                    eventCallback({
                        type: "status",
                        data: {
                            status: "starting",
                            timeTaken: time,
                            process: vueProcess
                        }
                    });

                    vueProcess.stdout?.on("data", (data: any) => {
                        if (!ready) {
                            if (data == "\x1B[34mi\x1B[39m \x1B[90m｢wdm｣\x1B[39m: Compiled successfully.\n") {
                                ready = true;
                                clearInterval(timer);
                                eventCallback({
                                    type: "status",
                                    data: {
                                        status: "ready",
                                        process: vueProcess,
                                        timeTaken: time
                                    }
                                });
                            }
                        }
                    });

                    vueProcess.stderr?.on("data", (data) => {
                        if (!ready) {
                            eventCallback({
                                type: "status",
                                data: {
                                    status: "error",
                                    process: vueProcess,
                                    timeTaken: time,
                                    dump: data
                                }
                            });
                        }
                    });
                }
                break;

            case "electron":
                {
                    let time = 0;
                    let timer = setInterval(() => {
                        time++;
                    }, 1000);

                    const electronProcess = spawn(<string><unknown>electron, [path.join(__dirname, "../electron/Main.js")]);
                    eventCallback({
                        type: "status",
                        data: {
                            status: "starting",
                            timeTaken: time,
                            process: electronProcess
                        }
                    });

                    electronProcess.stdout.on("data", () => {
                        clearInterval(timer);
                        eventCallback({
                            type: "status",
                            data: {
                                status: "ready",
                                timeTaken: time,
                                process: electronProcess
                            }
                        });
                    });
                }
                break;

            default:
                throw new Error("[ " + processName + " ] is not a valid process");
        }
    }
}