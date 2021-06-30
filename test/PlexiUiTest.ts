import PlexiUi, { ConstructorEvent } from "../src/PlexiUi";

new class PlexiUiTest {
    public plexiUi: PlexiUi;

    public constructor() {
        this.plexiUi = new PlexiUi({

        }, (event: ConstructorEvent) => {

        });
    }
}