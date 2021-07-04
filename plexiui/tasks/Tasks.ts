import Dev from "./dev/Dev";
import PlexiUi from "../PlexiUi";
import Pack from "./pack/Pack";

export default class Tasks {
    /**
     * @var { PlexiUi } plexiUi PlexiUi class object
     */
    public plexiUi: PlexiUi;

    /**
     * Tasks runner class
     * @param { PlexiUi } plexiUi PlexiUi class object
     */
    public constructor(plexiUi: PlexiUi) {
        this.plexiUi = plexiUi;
    }

    /**
     * Run the dev task
     */
    public dev() {
        const dev = new Dev();
        dev.run(this);
    }

    /**
     * Run the pack task
     */
    public pack() {
        const pack = new Pack();
        pack.run(this);
    }
}