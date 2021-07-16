import CommandHelper from "@axeridev/plexi-core-terminal/src/CommandHelper";
import PlexiCoreTerminal from "@axeridev/plexi-core-terminal";
import { spawn} from "child_process";
import * as path from "path";

export default class DevCommand {
    /**
     * Main method
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    public constructor(commandHelper: CommandHelper) {
        commandHelper
            .addCommand({
                trigger: "dev",
                desc: "Run the application in development mode",
                onTrigger: (args: Array<string>) => {
                    const plexiCoreTerminal = new PlexiCoreTerminal();

                    const tasks = {
                        vue: (done: CallableFunction) => {
                            const vue = spawn(path.join(process.cwd(), "./node_modules/.bin/vue-cli-service.cmd"), [
                                "serve"
                            ]);

                            vue.stdout.setEncoding("utf8");
                            vue.stdout.on("data", (data: string) => {
                                if (data.startsWith(" DONE")) {
                                    done();
                                }
                            });
                        },
                        electron: (done: CallableFunction) => {
                            const electron = spawn(path.join(process.cwd(), "./node_modules/.bin/electron.cmd"), [
                                "./"
                            ]);

                            electron.stdout.on("data", (data: string) => {
                                if (data == "_plexi-ui -> [ status ] -> ( ready ) -> [ process ] -> ( development )") {
                                    plexiCoreTerminal.animation.end("success", "ElectronJS is ready");
                                    done();
                                }
                            });
                        }
                    };

                    plexiCoreTerminal.animation.animate("Starting VueJS");
                    tasks.vue(() => {
                        plexiCoreTerminal.animation.end("success", "VueJS is ready");

                        plexiCoreTerminal.animation.animate("Starting ElectronJS");
                        tasks.electron(() => {
                            plexiCoreTerminal.animation.end("success", "ElectronJS is ready");
                            plexiCoreTerminal.write("The application is ready and running in development mode");
                        });
                    });
                }
            });
    }
}