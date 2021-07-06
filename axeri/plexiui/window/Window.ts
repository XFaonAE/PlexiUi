import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
const isDev = require("electron-is-dev");

new class Window {
    /**
     * @var { BrowserWindow | undefined } window Window object
     */
    public window: BrowserWindow | undefined;

    /**
     * Window constructor
     */
    public constructor() {
        app.on("ready", () => {
            this.window = new BrowserWindow({
                width: 1200,
                height: 700,
                frame: false,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    webviewTag: true
                }
            });

            if (isDev) {
                this.window.loadURL("http://localhost:8080").then(() => {
                    this.attachIpc();
                });

                return;
            }

            this.window.loadFile(path.join(__dirname, "../renderer/build/index.html")).then(() => {
                this.attachIpc();
            });
        });
    }

    /**
     * Attach IPC
     */
    public attachIpc() {
        ipcMain.on("windowSize", (event: any, args: any) => {
            if (this.window?.isMaximized()) {
                this.window?.restore();
                return;
            }

            this.window?.maximize();
        });

        ipcMain.on("windowMinimize", (event: any, args: any) => {
            this.window?.minimize();
        });
    }
}