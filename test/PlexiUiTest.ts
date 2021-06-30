import PlexiUi, { ConstructorEvent } from "../src/PlexiUi";

new class PlexiUiTest {
    public plexiUi: PlexiUi;

    public constructor() {
        this.plexiUi = new PlexiUi({
            runnerOptions: {},
            skip: {
                vue: true
            }
        }, (event: ConstructorEvent) => {
            console.log(event);
        });
    }
}