import PlexiUi from "../../axeri/plexiui/PlexiUi";

new class Package {
    public constructor() {
        const plexiUi = new PlexiUi();
        plexiUi.setOptions({
            mode: "pack",
            skip: {
                renderer: true
            }
        });

        plexiUi.run();
    }
}