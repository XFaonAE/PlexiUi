// @ts-nocheck
import {app, BrowserWindow, ipcMain, nativeTheme} from "electron";
import isDev from "electron-is-dev";
import * as path from "path";

new class Electron {
    /**
     * @var { BrowserWindow } browserWindow BrowserWindow class object
     */
    public browserWindow: BrowserWindow;

    /**
     * ElectronJS entry script
     */
    public constructor() {
        app.on("ready", () => {
            this.buildWindow();
        });
    }

    /**
     * Build the main browser window
     */
    public buildWindow() {
        const browserWindow = this.browserWindow = new BrowserWindow({
            width: 1000,
            height: 500,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        ipcMain.on("system:isDark", (event: any, args: any) => {
            event.reply("system:isDark.reply", nativeTheme.shouldUseDarkColors);
        });

        nativeTheme.on("updated", () => {
            browserWindow.webContents.send("system:themeUpdated");
        });

        if (isDev) {
            browserWindow.loadURL("http://localhost:8080").then(() => {
                console.log("view-ready");
            }).catch(() => {
                console.log("view-failed");
            });

            browserWindow.on("closed", () => {
                console.log("window-closed");
            })

            return;
        }

        browserWindow.loadFile(path.join(__dirname, "./../build/html/index.html")).then(() => {});
    }
}
