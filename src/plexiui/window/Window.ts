import { app, BrowserWindow, ipcMain } from "electron";
import electronIsDev from "electron-is-dev";
import path from "path";

new class Window {
    public constructor() {
        app.on("ready", () => {
            const window = new BrowserWindow({
                width: 1200,
                height: 700
            });

            if (electronIsDev) {
                window.loadURL("http://localhost:8080").then(() => {});
                return;
            }

            window.loadFile(path.join(__dirname, "")).then(() => {});
        });
    }
}