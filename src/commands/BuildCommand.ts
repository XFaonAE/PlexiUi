import {exec} from "child_process";
import CommandHelper from "@axeridev/plexi-core-terminal/src/CommandHelper";
import PlexiCoreTerminal from "@axeridev/plexi-core-terminal";
import {start} from "repl";

export default class BuildCommand {
    /**
     * Main method
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    public constructor(commandHelper: CommandHelper) {
        commandHelper.addCommand({
            trigger: "build",
            desc: "Build your application",
            onTrigger: (args: Array<string>) => {
                const quit = () => {
                    process.exit(0);
                }

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
                plexiCoreTerminal.section("PlexiUI | Build");

                const compile = {
                    html: (done: CallableFunction) => {
                        const html = exec("npx vue-cli-service build", {
                            cwd: process.cwd()
                        });

                        let ready = false;
                        html.stdout?.on("data", (data: string) => {
                            if (!ready && data.startsWith(" DONE")) {
                                ready = true;
                                done();
                            }
                        });
                    },
                    win32: (done: CallableFunction) => {
                        const win32 = exec("npx electron-builder --win ", {
                            cwd: process.cwd()
                        });

                        let ready = false;
                        const win32Stdout = (data: string) => {
                            if (!ready && data.startsWith("building block map")) {
                                ready = true;
                                done();
                            }
                        }

                        win32.stdout?.on("data", (data: string) => {
                            win32Stdout(data);
                        });

                        win32.stderr?.on("data", (data: string) => {
                            win32Stdout(data);
                        });
                    }
                };

                startTimer();
                plexiCoreTerminal.animation.animate("Compiling VueJS");
                compile.html(() => {
                    plexiCoreTerminal.animation.end("success", "Finished compiling VueJS after " + endTimer());

                    startTimer();
                    plexiCoreTerminal.animation.animate("Building for win32");
                    compile.win32(() => {
                        plexiCoreTerminal.animation.end("success", "Finished building for win32 after " + endTimer());
                        plexiCoreTerminal.write("Build finished");
                        quit();
                    });
                });
            }
        });
    }
}
