import Renderer from "./plexiUi/Renderer";
import PlexiCore from "@axeridev/plexi-core";
import Window from "./plexiUi/Window";
import Events from "./plexiUi/Events";

export default class PlexiUi {
    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    public plexiCore: PlexiCore;

    /**
     * PlexiUi entry class
     */
    public constructor() {
        this.plexiCore = new PlexiCore();
        const renderer = new Renderer(this);
        const window = new Window(this);

        renderer.plexiUi.plexiCore.terminal.dividerCreate("PlexiUi | Renderer");

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
                                                break;
                                        }
                                        break;
                                }
                            });
                            break;

                        case "error":
                            this.plexiCore.terminal.writeSpinner("Html renderer failed to start after " + event.data.timeTaken + "s");
                            this.plexiCore.terminal.exitSpinner("error");

                            renderer.plexiUi.plexiCore.terminal.dividerCreate("PlexiUi | Failed", {
                                barHex: "#ff7777",
                                titleHex: "#ff7777"
                            });

                            console.log(event.data.dump);
                            process.exit(0);
                            break;
                    }
                    break;
            }
        });
    }
}