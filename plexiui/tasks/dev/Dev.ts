import Tasks from "../Tasks";
import electron from "electron";
import { spawn, exec } from "child_process";
import path from "path";
const packageJson = require("../../../package.json");

export default class Dev {
    /**
     * Run dev script
     * @param { Tasks } tasks Tasks class object
     */
    public run(tasks: Tasks) {
        const plexiCore = tasks.plexiUi.plexiCore;
        plexiCore.terminal.dividerCreate("PlexiUI | Dev");

        this.executeRenderer((event: any) => {
            switch (event.status) {
                case "starting":
                    plexiCore.terminal.animation.write("Starting renderer");
                    break;

                case "ready":
                    plexiCore.terminal.animation.write("Renderer started after " + event.timeSpent + "s");
                    plexiCore.terminal.animation.exitSpinner("success");

                    this.executeWindow((event: any) => {
                        switch (event.status) {
                            case "starting":
                                plexiCore.terminal.animation.write("Starting window");
                                break;

                            case "ready":
                                plexiCore.terminal.animation.write("Window started after " + event.timeSpent + "s");
                                plexiCore.terminal.animation.exitSpinner("success");
                                break;

                            case "error":
                                plexiCore.terminal.animation.write("Failed to start window");
                                plexiCore.terminal.animation.exitSpinner("error");
                                break;
                        }
                    });
                    break;

                case "error":
                    plexiCore.terminal.animation.write("Failed to start renderer");
                    plexiCore.terminal.animation.exitSpinner("error");
                    break;
            }
        });
    }

    /**
     * Execute renderer process
     * @param { CallableFunction } eventCallback Event callback
     */
    public executeRenderer(eventCallback: CallableFunction = () => {}) {
        let time = 0;
        let timer = setInterval(() => {
            time++;
        }, 1000);

        eventCallback({
            status: "starting"
        });

        const rendererProcess = exec("npx vue-cli-service serve");
        let initialReady = false;

        rendererProcess.stdout?.on("data", (data: string) => {
            if (data.startsWith(" DONE")) {
                if (!initialReady) {
                    initialReady = true;
                    clearInterval(timer);
                    eventCallback({
                        status: "ready",
                        timeSpent: time
                    });
                }
            }
        });
    }

    /**
     * Execute window process
     * @param { CallableFunction } eventCallback Event callback
     */
    public executeWindow(eventCallback: CallableFunction = () => {}) {
        let time = 0;
        let timer = setInterval(() => {
            time++;
        }, 1000);

        eventCallback({
            status: "starting"
        });

        const windowProcess = spawn(<string><unknown>electron, [ packageJson.main ]);
        let initialReady = false;

        windowProcess.stdout.on("data", (data: any) => {
            if (!initialReady) {
                initialReady = true;
                clearInterval(timer);
                eventCallback({
                    status: "ready",
                    timeSpent: time
                });
            }
        });

        windowProcess.stderr.on("data", (data: any) => {
            if (!initialReady) {
                initialReady = true;
                eventCallback({
                    status: "error"
                });
            }
        });

    }
}