import PlexiUi from "../PlexiUi";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
const packageJson = require("../../package.json");

export interface PackageOptions {
    out: string;
}

export interface PackagerEvent {
    type: string;
    data: any;
}

export default class Packager {
    /**
     * @var { PlexiUi } plexiUi PlexiUi class object
     */
    public plexiUi: PlexiUi;

    /**
     * Packager class
     * @param { PlexiUi } plexiUi PlexiUi class object
     */
    public constructor(plexiUi: PlexiUi) {
        this.plexiUi = plexiUi;
    }

    /**
     * Run packager
     * @param { object } rawOptions Options
     * @param { CallableFunction } eventCallback Event callback
     */
    public pack(rawOptions: object, eventCallback: CallableFunction) {
        let time = 0;
        let timer = setInterval(() => {
            time++;
        }, 1000);

        const defaultOptions: PackageOptions = {
            out: path.join(__dirname, "./vue/cache/build")
        };
        const options: PackageOptions = Object.assign(defaultOptions, rawOptions);
        const renderPackagerProcess = exec("npx webpack --mode production");

        eventCallback({
            type: "status",
            data: {
                status: "starting",
                on: "renderer-pack",
                timeTaken: time,
                process: renderPackagerProcess
            }
        });

        renderPackagerProcess.stdout?.on("data", (data: string) => {
            clearInterval(timer);
                eventCallback({
                type: "status",
                data: {
                    status: "ready",
                    on: "renderer-pack",
                    timeTaken: time,
                    process: renderPackagerProcess
                }
            });

            time = 0;
            timer = setInterval(() => {
                time++;
            }, 1000);

            packageJson.main = "./src/electron/Main.js";
            fs.writeFile(path.join(__dirname, "../../package.json"), JSON.stringify(packageJson), (error: any) => {});

            const packagerWinProcess = exec("npx electron-packager ./ --overwrite --platform=win32 --out=" + options.out, {
                cwd: path.join(__dirname, "../../")
            });

            eventCallback({
                type: "status",
                data: {
                    status: "starting",
                    on: "win-pack",
                    timeTaken: time,
                    process: packagerWinProcess
                }
            });

            packagerWinProcess.stderr?.on("data", (data: string) => {
                if (data.startsWith("Wrote new app to ")) {
                    clearInterval(timer);
                    eventCallback({
                        type: "status",
                        data: {
                            status: "ready",
                            on: "win-pack",
                            timeTaken: time,
                            process: packagerWinProcess
                        }
                    });

                    packageJson.main = "./src/PlexiUi.js";
                    fs.writeFile(path.join(__dirname, "../../package.json"), JSON.stringify(packageJson), (error: any) => {});
                }
            });
        });
    }
}