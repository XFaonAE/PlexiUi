import path from "path";
import PlexiUi from "../../src/PlexiUi";

new class Pack {
    public constructor() {
        const plexiUi: PlexiUi = new PlexiUi();
        plexiUi.package({
            out: path.join(__dirname, "../build")
        });
    }
}