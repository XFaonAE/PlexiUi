import PlexiUi, { DevEvent } from "../src/PlexiUi";

new class PlexiUiTest {
    public plexiUi: PlexiUi;

    public constructor() {
        this.plexiUi = new PlexiUi();
        this.plexiUi.dev({}, (event: DevEvent) => {
            console.log(event);
        });
    }
}