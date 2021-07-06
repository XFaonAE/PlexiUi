import { app, BrowserWindow, ipcMain } from "electron";

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

            this.window.loadURL("http://localhost:8080");
        });
    }
}