import PlexiUi from "../../axeri/plexiui/PlexiUi";

new class Package {
    public constructor() {
        const plexiUi = new PlexiUi();
        plexiUi.setOptions({
            mode: "pack"
        });

        plexiUi.run();
    }
}