// @ts-nocheck
import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";

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
            width: 1500,
            height: 800
        });

        if (isDev) {
            browserWindow.loadURL("http://localhost:8080").then(() => {
                console.log(`_plexi-ui -> [ status ] -> ( ready ) -> [ process ] -> ( development )`);
            });

            return;
        }

        browserWindow.loadFile(path.join(__dirname, "./../../build/vue/index.html"));
        console.log(`_plexi-ui -> [ status ] -> ( ready ) -> [ process ] -> ( production )`);
    }
}
