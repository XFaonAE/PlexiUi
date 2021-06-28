import PlexiUi from "../PlexiUi";
import { spawn } from "child_process";
import electron from "electron";
import path from "path";

export default class Window {
    /**
     * @var { PlexiUi } plexiUi PlexiUi class object
     */
    public plexiUi: PlexiUi;

    /**
     * Window process manager
     * @param { PlexiUi } plexiUi PlexiUi class object
     */
    public constructor(plexiUi: PlexiUi) {
        this.plexiUi = plexiUi;
    }

    /**
     * Start the window process
     * @param { CallableFunction } callback Callback for events
     */
    public startWindow(callback: CallableFunction = () => {}) {
        let time: number = 0;
        let timer = setInterval(() => {
            time += 0.1;
        }, 100);

        const windowProcess = spawn(electron + "", [path.join(__dirname, "../window/Window.js")]);

        callback({
            type: "status",
            data: {
                timeTaken: Math.round(time),
                window: windowProcess,
                status: "starting"
            }
        });

        windowProcess.stdout.on("data", () => {
            clearInterval(timer);
            callback({
                type: "status",
                data: {
                    timeTaken: Math.round(time),
                    window: windowProcess,
                    status: "ready"
                }
            });
        });
    }
}