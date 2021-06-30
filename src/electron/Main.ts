const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");

new class Main {
    public constructor() {
        app.on("ready", () => {
            const window = new BrowserWindow({
                width: 1400,
                height: 700,
                frame: false,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false
                }
            });

            if (process.env.NODE_ENV !== "production") {
                window.loadURL("http://localhost:8080").then(() => {});
                return;
            }

            window.loadFile(path.join(__dirname, "../vue/cache/build/index.html")).then(() => {});
        });
    }
}