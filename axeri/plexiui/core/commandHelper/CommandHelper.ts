import readline from "readline";

export default class CommandHelper {
    /**
     * Command helper
     */
    public constructor(plexiUi: any, meta: any) {
        const plexiCore = plexiUi.plexiCore;
        plexiCore.terminal.helper.registerCommand({
            keyword: "exit",
            run: (args: Array<string>) => {
                const plexiCore = plexiUi.plexiCore;
                if (args.length !== 1) {
                    if (args[1] == "window") {
                        plexiCore.terminal.writeAnimation("Halting window process");
                        
                        if (meta.window && meta.window.lastEvent.process) {
                            meta.window.lastEvent.process.kill();
                            meta.window.lastEvent.process = null;

                            plexiCore.terminal.done("success", "Window process halted");
                            return;
                        }

                        plexiCore.terminal.done("error", "The window process is not running");
                        return;
                    }

                    return;
                }

                plexiCore.terminal.done("success", "Application halted");
                process.exit(0);
            }
        });

        plexiCore.terminal.helper.startListener();
    }
}