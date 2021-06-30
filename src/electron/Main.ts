const { BrowserWindow, app, ipcMain } = require("electron");

new class Main {
    public constructor() {
        const window: typeof BrowserWindow = new BrowserWindow({
            width: 1400,
            height: 700,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
    }
}