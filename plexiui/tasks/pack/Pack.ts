import Tasks from "../Tasks";
import { exec } from "child_process";
import path from "path";

export default class Pack {
    /**
     * Run the application packer
     * @param { Tasks } tasks Tasks class object
     */
    public run(tasks: Tasks) {
        const plexiCore = tasks.plexiUi.plexiCore;
        plexiCore.terminal.dividerCreate("PlexiUi | Pack");

        this.packRenderer((event: any) => {
            switch (event.status) {
                case "starting":
                    plexiCore.terminal.animation.write("Packing renderer content");
                    break;

                case "ready":
                    plexiCore.terminal.animation.write("Packed renderer content after " + event.timeSpent + "s");
                    plexiCore.terminal.animation.exitSpinner("success");
                    break;

                case "error":
                    plexiCore.terminal.animation.write("Failed to pack renderer content");
                    plexiCore.terminal.animation.exitSpinner("error");
                    break;
            }
        });
    }

    /**
     * Pack renderer content
     * @param { CallableFunction } eventCallback Event callback
     */
    public packRenderer(eventCallback: CallableFunction = () => {}) {
        let time = 0;
        let timer = setInterval(() => {
            time++;
        }, 1000);

        eventCallback({
            status: "starting"
        });

        const rendererPacker = exec("npx vue-cli-service build");
        let initialReady = false;

        rendererPacker.stdout?.on("data", (data: any) => {
            if (!initialReady) {
                if (data.startsWith(" DONE")) {
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
}