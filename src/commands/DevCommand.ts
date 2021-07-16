import CommandHelper from "@axeridev/plexi-core-terminal/src/CommandHelper";
import PlexiCoreTerminal from "@axeridev/plexi-core-terminal";
import {spawn} from "child_process";
import * as path from "path";

export default class DevCommand {
    /**
     * Main method
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    public constructor(commandHelper: CommandHelper) {
        commandHelper.addCommand({
            trigger: "dev",
            desc: "Run the application in development mode",
            onTrigger: (args: Array<string>) => {
                let timer: {
                    timer: any,
                    time: number
                } = {
                    timer: null,
                    time: 0
                };

                const startTimer = () => {
                    timer.time = 0;
                    timer.timer = setInterval(() => {
                        timer.time++;
                    }, 1000);
                }

                const endTimer = () => {
                    clearInterval(timer.timer);
                    return timer.time + "s";
                }

                const plexiCoreTerminal = new PlexiCoreTerminal();
                plexiCoreTerminal.section("PlexiUI | Development Server");

                let processes: Array<any> = [];
                const quit = () => {
                    plexiCoreTerminal.write("Stopping development server");
                    processes.forEach((value: any) => {
                        value.kill();
                    });

                    process.exit(0);
                }

                const tasks = {
                    vue: (done: CallableFunction) => {
                        const vue = spawn(path.join(process.cwd(), "./node_modules/.bin/vue-cli-service.cmd"), [
                            "serve"
                        ]);

                        let ready = false;
                        vue.stdout.setEncoding("utf8");
                        vue.stdout.on("data", (data: string) => {
                            if (!ready && data.startsWith(" DONE")) {
                                ready = true;
                                processes.push(vue);
                                done();
                            }
                        });
                    },
                    electron: (done: CallableFunction) => {
                        const electron = spawn(path.join(process.cwd(), "./node_modules/.bin/electron.cmd"), [
                            "./"
                        ]);

                        let ready = false;
                        electron.stdout.setEncoding("utf8");
                        electron.stdout.on("data", (data: string) => {
                            if (!ready && data == "view-ready\n") {
                                ready = true;
                                processes.push(electron);
                                done();
                                return;
                            }

                            if (data == "view-failed\n") {
                                plexiCoreTerminal.animation.end("error", "ElectronJS failed to load the view contents");
                            }
                        });

                        electron.on("exit", () => {
                            quit();
                        });
                    }
                };

                startTimer();
                plexiCoreTerminal.animation.animate("Starting VueJS");
                tasks.vue(() => {
                    plexiCoreTerminal.animation.end("success", "VueJS is ready after " + endTimer());

                    startTimer();
                    plexiCoreTerminal.animation.animate("Starting ElectronJS");
                    tasks.electron(() => {
                        plexiCoreTerminal.animation.end("success", "ElectronJS is ready after " + endTimer());
                        plexiCoreTerminal.write("The application is ready and running in development mode");
                    });
                });
            }
        });
    }
}
