import { app, BrowserWindow, ipcMain } from "electron";

new class Window {
    /**
     * @var { BrowserWindow } window Window object
     */
    public window: BrowserWindow;

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

            ipcMain.on("windowSize", (event: any, args: any) => {
                if (this.window.isMaximized()) {
                    this.window.restore();
                    return;
                }

                this.window.maximize();
            });

            ipcMain.on("windowMinimize", (event: any, args: any) => {
                this.window.minimize();
            });
        });
    }
}