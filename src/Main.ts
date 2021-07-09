import PlexiUi from "../axeri/plexiui/PlexiUi";

const plexiUi = new PlexiUi();
plexiUi.setOptions({
    skip: {
        renderer: true,
        window: true
    }
});

plexiUi.run();