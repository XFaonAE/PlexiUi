const { BrowserWindow, app, ipcMain } = require("electron");

new class Main {
    public constructor() {
        app.on("ready", () => {
            const window = new BrowserWindow({
                width: 1400,
                height: 700,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false
                }
            });

            window.loadURL("http://localhost:8080").then(() => {});
        });
    }
}