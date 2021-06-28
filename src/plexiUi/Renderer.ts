import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import path from "path";
import Events from "./StartRenderer/Events";

export default class Renderer {
    /**
     * @var { ChildProcessWithoutNullStreams } renderer Renderer process
     */
    public renderer: ChildProcessWithoutNullStreams | null;

    /**
     * Class managing all processes of the renderer
     */
    public constructor() {
        this.renderer = null;

        this.startRenderer({}, (event: Events) => {
            switch (event.type) {
                case "status":
                    switch (event.data.status) {
                        case "starting":
                            console.log("Starting...");
                            break;

                        case "ready":
                            console.log("Ready after: " + event.data.timeTaken + "s");
                            break;
                    }
                    break;
            }
        });
    }

    /**
     * Start the renderer process
     * @param { object } rawOptions Any startup options
     * @param { CallableFunction } callback Callback event listener
     * @return { this } Self
     */
    public startRenderer(rawOptions: object = {}, callback: CallableFunction = () => {}): this {
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
        });

        return this;
    }
}