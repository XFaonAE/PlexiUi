import { exec, spawn } from "child_process";
import path from "path";
import electron from "electron";

export default class Process {
    /**
     * Run a core processes
     * @param { "renderer" | "window" | "packageRenderer | "packageWin32 } processName Name of the process to run
     * @param { CallableFunction } eventCallback Callback for all events
     */
    public run(processName: "renderer" | "window" | "packageRenderer" | "packageWin32", eventCallback: CallableFunction) {
        let time = 0;
        let timer = setInterval(() => {
            time++;
        }, 1000);
        let ready = false;

        switch (processName) {
            case "renderer":
                const renderer = exec("npx vue-cli-service serve", {
                    cwd: path.join(__dirname, "../../../../")
                });
                ready = false;

                renderer.stdout?.on("data", (data: string) => {
                    if (!ready) {
                        if (data.startsWith(" DONE")) {
                            ready = true;
                            clearInterval(timer);

                            eventCallback({
                                status: "done",
                                after: time + "s",
                                process: renderer
                            });
                        }
                    }
                });

                renderer.stderr?.on("data", (data: string) => {
                    eventCallback({
                        status: "progress",
                        percent: (data.match(/<s> \[webpack.Progress\] (.+?) (.??)/)?.[1]),
                        time: time
                    });
                });
                break;

            case "window":
                const window = spawn(<string><unknown>electron, [
                    "./"
                ]);
                ready = false;

                window.stdout?.on("data", (data: string) => {
                    if (!ready) {
                        ready = true;
                        clearInterval(timer);

                        eventCallback({
                            status: "done",
                            process: window,
                            after: time + "s"
                        });
                    }
                });
                break;

            case "packageRenderer":
                const rendererPackager = exec("npx vue-cli-service build", {
                    cwd: path.join(__dirname, "../../../../")
                });
                ready = false;

                rendererPackager.stdout?.on("data", (data: string) => {
                    if (!ready) {
                        if (data.startsWith(" DONE")) {
                            ready = true;
                            clearInterval(timer);

                            eventCallback({
                                status: "done",
                                after: time + "s",
                                process: rendererPackager
                            });
                        }
                    }
                });
                break;

            case "packageWin32":
                const win32Packager = exec("npx electron-builder --win", {
                    cwd: path.join(__dirname, "../../../../")
                });
                ready = false;

                win32Packager.stdout?.on("data", (data: string) => {
                    if (!ready) {
                        if (data.startsWith("building block map")) {
                            ready = true;
                            clearInterval(timer);

                            eventCallback({
                                status: "done",
                                after: time + "s",
                                process: win32Packager
                            });
                        }
                    }
                });

                win32Packager.stderr?.on("data", (data: string) => {
                    console.log(data);
                });
                break;
        }
    }
}