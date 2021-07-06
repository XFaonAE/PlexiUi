import path from "path";
import PlexiCore from "../plexicore/PlexiCore";
import Process from "./core/process/Process";

export interface RunOptions {
    /**
     * Window main script location powered by ElectronJS
     */
    windowMain?: string;

    /**
     * Mode for the framework
     */
    mode?: "dev" | "pack";

    /**
     * Skip a process
     */
    skip?: {
        renderer?: boolean;
        window?: boolean;
    };
}

export default class PlexiUi {
    /**
     * @var { RunOptions } options Run options
     */
    public options: RunOptions;

    /**
     * @var { PlexiCore | undefined } plexiCore PlexiCore class object
     */
    public plexiCore: PlexiCore;

    /**
     * PlexiUi entry
     */
    public constructor() {
        this.plexiCore = new PlexiCore();
        this.options = {
            windowMain: path.join(__dirname, "./window/Window.js"),
            mode: "dev",
            skip: {
                renderer: false,
                window: false
            }
        };
    }

    /**
     * Set the options
     * @param { RunOptions } options Run options
     */
    public setOptions(options: RunOptions) {
        this.options = {
            ...this.options,
            ...options
        };
    }

    /**
     * Run framework
     */
    public run() {
        const plexiCore = this.plexiCore;
        const options = this.options;
        const processRun = new Process();

        switch (options.mode) {
            case "dev":
                (() => {
                    const tasks = {
                        startRenderer(doneEvent: CallableFunction) {
                            if (options.skip?.renderer) {
                                plexiCore.terminal.done("warning", "Skipping renderer process");
                                doneEvent();
                                return;
                            }
                            plexiCore.terminal.writeAnimation("Starting renderer");

                            processRun.run("renderer", (event: any) => {
                                switch (event.status) {
                                    case "done":
                                        plexiCore.terminal.done("success", "Renderer started after " + event.after);
                                        doneEvent();
                                        break;
                                }
                            });
                        },
                        startWindow(doneEvent: CallableFunction) {
                            if (options.skip?.window) {
                                plexiCore.terminal.done("warning", "Skipping window process");
                                doneEvent();
                                return;
                            }
                            plexiCore.terminal.writeAnimation("Starting window");

                            processRun.run("window", (event: any) => {
                                switch (event.status) {
                                    case "done":
                                        plexiCore.terminal.done("success", "Window started after " + event.after);
                                        doneEvent();
                                        break;
                                }
                            });
                        }
                    };

                    tasks.startRenderer(() => {
                        tasks.startWindow(() => {
                        });
                    });
                })();
                break;

            case "pack":
                (() => {
                    const tasks = {
                        buildRenderer(doneEvent: CallableFunction) {
                            if (options.skip?.renderer) {
                                plexiCore.terminal.done("warning", "Skipping build for renderer");
                                doneEvent();
                                return;
                            }
                            plexiCore.terminal.writeAnimation("Building renderer content");

                            processRun.run("packageRenderer", (event: any) => {
                                switch (event.status) {
                                    case "done":
                                        plexiCore.terminal.done("success", "Finished building renderer content after " + event.after);
                                        doneEvent();
                                        break;
                                }
                            });
                        },
                        packageWindow(doneEvent: CallableFunction) {
                            if (options.skip?.window) {
                                plexiCore.terminal.done("warning", "Skipping packager for window");
                                doneEvent();
                                return;
                            }
                            plexiCore.terminal.writeAnimation("Building window for win32");

                            processRun.run("packageWin32", (event: any) => {
                                switch (event.status) {
                                    case "done":
                                        plexiCore.terminal.done("success", "Finished packaging window for win32 after " + event.after);
                                        doneEvent();
                                        break;
                                }
                            });
                        }
                    };

                    tasks.buildRenderer(() => {
                        tasks.packageWindow(() => {
                            process.exit(0);
                        });
                    });
                })();
                break;
        }
    }
}