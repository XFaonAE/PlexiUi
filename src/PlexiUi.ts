import Renderer from "./plexiUi/Renderer";
import PlexiCore from "@axeridev/plexi-core";
import Window from "./plexiUi/Window";
import Events from "./plexiUi/Events";
import path from "path";

export default class PlexiUi {
    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    public plexiCore: PlexiCore;

    /**
     * PlexiUi entry class
     */
    public constructor() {
        process.chdir(path.join(__dirname, "../"));
        this.plexiCore = new PlexiCore();
    }

    /**
     * Run framework code logic
     * @param { object } rawOptions Options
     */
    public run(rawOptions: object) {
        interface Options {
            renderDir: string;
        }

        const templateOptions: Options = {
            renderDir: ""
        };

        const options: Options = Object.assign(templateOptions, rawOptions);
        const renderer: Renderer = new Renderer(this);
        const window: Window = new Window(this);
        let resourceEventsAttached: boolean = false;

        renderer.plexiUi.plexiCore.terminal.dividerCreate("PlexiUi | Renderer");

        renderer.startCopy(options, (event: Events) => {
            switch (event.type) {
                case "status":
                    switch (event.data.status) {
                        case "starting":
                            this.plexiCore.terminal.writeSpinner("Starting Html renderer resource copy...");
                            break;

                        case "error":
                            this.plexiCore.terminal.writeSpinner("Failed to copy Html renderer resources after " + event.data.timeTaken + "s")
                            this.plexiCore.terminal.exitSpinner("error");

                            this.plexiCore.terminal.dividerCreate("PlexiUi | Failed", {
                                barHex: "#ff7777",
                                titleHex: "#ff7777"
                            });

                            console.error(event.data.dump);
                            process.exit(0);
                            break;

                        case "ready":
                            this.plexiCore.terminal.writeSpinner("Html renderer resource copy finished after " + event.data.timeTaken + "s");
                            this.plexiCore.terminal.exitSpinner("success");

                            renderer.startRenderer((event: Events) => {
                                switch (event.type) {
                                    case "status":
                                        switch (event.data.status) {
                                            case "starting":
                                                this.plexiCore.terminal.writeSpinner("Starting Html renderer...");
                                                break;

                                            case "ready":
                                                this.plexiCore.terminal.writeSpinner("Html renderer started after " + event.data.timeTaken + "s");
                                                this.plexiCore.terminal.exitSpinner("success");

                                                window.startWindow((event: Events) => {
                                                    switch (event.type) {
                                                        case "status":
                                                            switch (event.data.status) {
                                                                case "starting":
                                                                    this.plexiCore.terminal.dividerCreate("PlexiUi | Window");
                                                                    this.plexiCore.terminal.writeSpinner("Starting window process...");
                                                                    break;

                                                                case "ready":
                                                                    this.plexiCore.terminal.writeSpinner("Window process started after " + event.data.timeTaken + "s");
                                                                    this.plexiCore.terminal.exitSpinner("success");

                                                                    if (!resourceEventsAttached) {
                                                                        resourceEventsAttached = true;
                                                                        renderer.attachResourceEvent(options, (event: Events) => {
                                                                            switch (event.type) {
                                                                                case "status":
                                                                                    switch (event.data.status) {
                                                                                        case "starting":
                                                                                            this.plexiCore.terminal.writeSpinner("Attaching change listeners...");
                                                                                            break;

                                                                                        case "ready":
                                                                                            this.plexiCore.terminal.writeSpinner("Change listeners attached after " + event.data.timeTaken + "s");
                                                                                            this.plexiCore.terminal.exitSpinner("success");
                                                                                            break;
                                                                                    }
                                                                                    break;
                                                                            }
                                                                        });
                                                                    }
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                });
                                                break;

                                            case "error":
                                                this.plexiCore.terminal.writeSpinner("Html renderer failed to start after " + event.data.timeTaken + "s");
                                                this.plexiCore.terminal.exitSpinner("error");

                                                this.plexiCore.terminal.dividerCreate("PlexiUi | Failed", {
                                                    barHex: "#ff7777",
                                                    titleHex: "#ff7777"
                                                });

                                                console.error(event.data.dump);
                                                break;
                                        }
                                        break;
                                }
                            });
                            break;
                    }
                    break;
            }
        });
    }
}