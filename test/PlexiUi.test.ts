import PlexiUi from "../src/PlexiUi";
import path from "path";

new class PlexiUiTest {
    public constructor() {
        const plexiUi = new PlexiUi();
        plexiUi.run({
            renderDir: path.join(__dirname, "./render")
        });
    }
}