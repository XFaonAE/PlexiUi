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
export interface ProcessEvent {
    type: string;
    data: any;
}
export default class ProcessRunner {
    /**
     * @var { Processes } processes Processes list
     */
    processes: Processes;
    /**
     * Used for running framework component processes
     */
    constructor();
    /**
     * Run a component process
     * @param { string } processName Name of the process
     * @param { RunOptions } rawOptions Process run options
     * @param { CallableFunction } eventCallback Event callback
     */
    run(processName: string, rawOptions: any, eventCallback?: CallableFunction): void;
}
//# sourceMappingURL=ProcessRunner.d.ts.map