import { exec, ChildProcessWithoutNullStreams } from "child_process";
import path from "path";
// @ts-ignore
import fse from "fs-extra";
import PlexiUi from "../PlexiUi";
import fs from "fs";
// @ts-ignore
import onFileChange from "on-file-change";
import Events from "./Events";

export default class Renderer {
    /**
     * @var { PlexiUi } plexiUi PlexiUi class object
     */
    public plexiUi: PlexiUi;

    /**
     * @var { ChildProcessWithoutNullStreams } renderer Renderer process
     */
    public renderer: ChildProcessWithoutNullStreams | null;

    /**
     * @var { boolean } readyTriggered Has the ready event triggered
     */
    public readyTriggered: boolean;

    /**
     * Class managing all processes of the renderer
     */
    public constructor(plexiUi: PlexiUi) {
        this.plexiUi = plexiUi;
        this.renderer = null;
        this.readyTriggered = false;
    }

    /**
     * Start resource copy
     * @param { Events } options Full set of options
     * @param { CallableFunction } callback Callback event listener
     */
    public startCopy(options: any, callback: CallableFunction = () => {}) {
        let time: number = 0;
        let timer = setInterval(() => {
            time += 0.1;
        }, 100);

        callback({
            type: "status",
            data: {
                status: "starting",
                timeTaken: time
            }
        });

        fse.copySync(options.renderDir, path.join(__dirname, "../renderer/render"), {
            overwrite: true
        }, (error: any) => {
            if (error) {
                clearInterval(timer);
                callback({
                    type: "status",
                    data: {
                        status: "error",
                        timeTaken: time,
                        dump: error
                    }
                });
                return;
            }
        });

        clearInterval(timer);
        callback({
            type: "status",
            data: {
                status: "ready",
                timeTaken: time
            }
        });
    }

    /**
     * Start the renderer process
     * @param { CallableFunction } callback Callback event listener
     * @return { this } Self
     */
    public startRenderer(callback: CallableFunction = () => {}): this {
        let time: number = 0;
        let timer = setInterval(() => {
            time += 0.1;
        }, 100);

        const rendererProcess = exec("npx webpack serve --mode development --hot --port 8080", {
            cwd: path.join(__dirname, "../../")
        });

        callback({
            type: "status",
            data: {
                status: "starting",
                renderer: rendererProcess
            }
        });

        rendererProcess?.stdout?.on("data", (data: any) => {
            if (data.toString() == "\x1B[34mi\x1B[39m \x1B[90m｢wdm｣\x1B[39m: Compiled successfully.\n") {
                if (!this.readyTriggered) {
                    this.readyTriggered = true;
                    clearInterval(timer);
                    callback({
                        type: "status",
                        data: {
                            status: "ready",
                            renderer: rendererProcess,
                            timeTaken: Math.round(time)
                        }
                    });
                }
            }
        });

        rendererProcess?.stderr?.on("data", (data: any) => {
            clearInterval(timer);
            callback({
                type: "status",
                data: {
                    status: "error",
                    timeTaken: Math.round(time),
                    renderer: rendererProcess,
                    dump: data.toString()
                }
            });
        });

        return this;
    }

    /**
     * Attach all component change listeners
     * @param options Full framework options
     * @param { CallableFunction } callback Callback to trigger on events
     */
    public attachResourceEvent(options: any, callback: CallableFunction = () => {}) {
        fs.readdir(options.renderDir, (error: any, files: any) => {
            files.forEach((value: any, index: number) => {
                console.log(value)
                onFileChange(path.join(options.renderDir, value), () => {
                    this.startCopy(options, (event: Events) => {
                        switch (event.type) {
                            case "status":
                                switch (event.data.status) {
                                    case "starting":
                                        this.plexiUi.plexiCore.terminal.writeSpinner("Updating components...");
                                        break;

                                    case "ready":
                                        this.plexiUi.plexiCore.terminal.writeSpinner("Components updated after " + event.data.timeTaken + "s");
                                        this.plexiUi.plexiCore.terminal.exitSpinner("success");
                                        break;
                                }
                                break;
                        }
                    });
                });
            });
        });
    }
}