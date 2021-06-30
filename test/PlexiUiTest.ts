import PlexiUi, {DevEvent, DevOptions} from "../src/PlexiUi";

new class PlexiUiTest {
    public plexiUi: PlexiUi;

    public constructor() {
        this.plexiUi = new PlexiUi();
        this.plexiUi.dev({
            runnerOptions: {}
        }, (event: DevEvent) => {
            console.log(event);
        });
    }
}