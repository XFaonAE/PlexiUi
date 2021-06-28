import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import path from "path";
import Events from "./Events";
import PlexiUi from "../PlexiUi";

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
     * Start the renderer process
     * @param { CallableFunction } callback Callback event listener
     * @return { this } Self
     */
    public startRenderer(callback: CallableFunction = () => {}): this {
        let time: number = 0;
        let timer = setInterval(() => {
            time += 0.1;
        }, 100);

        const rendererProcess = spawn(path.join(__dirname, "../../node_modules/.bin/webpack.cmd"), ["serve", "--mode", "development", "--hot"]);

        callback({
            type: "status",
            data: {
                status: "starting",
                renderer: rendererProcess
            }
        });

        rendererProcess.stdout.on("data", (data: any) => {
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

        return this;
    }
}