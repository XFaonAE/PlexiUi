const { ipcMain, app, BrowserWindow } = require("electron");

new class Window {
    /**
     * Main ElectronJS script
     */
    public constructor() {
        app.on("ready", () => {
            this.createWindow();
        });
    }

    /**
     * Create the ElectronJS window
     */
    public createWindow() {
        const window = new BrowserWindow({
            width: 1500,
            height: 800,
            frame: false,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true
            }
        });
        window.loadURL("http://localhost:8080").then(() => {});

        app.on("browser-window-created", () => {
            console.log("ready");
        });
    }
}