import PlexiUi, { DevEvent } from "../src/PlexiUi";
import path from "path";

new class PlexiUiTest {
    public plexiUi: PlexiUi;

    public constructor() {
        this.plexiUi = new PlexiUi();
        this.plexiUi.dev({
            renderRoot: path.join(__dirname, "./render")
        }, (event: DevEvent) => {
            console.log(event);
        });
    }
}