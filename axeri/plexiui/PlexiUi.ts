import path from "path";
import PlexiCore from "../plexicore/PlexiCore";
import Terminal from "../plexicore/core/terminal/Terminal";

export interface RunOptions {
    /**
     * Window main script location powered by ElectronJS
     */
    windowMain?: string;

    /**
     * Mode for the framework
     */
    mode?: "dev" | "pack";
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
            mode: "dev"
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
        this.plexiCore.terminal.writeAnimation("Starting renderer...");

        setTimeout(() => {
            this.plexiCore.terminal.endAnimation("success");
        }, 1500);
    }
}