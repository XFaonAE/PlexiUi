/**
 * @copyright AxeriDev LLC
 * @version 0.0.1
 * @author AxeriDev <support@axeri.net>
 */

import PlexiCore from "@axeridev/plexi-core";
import Tasks from "./tasks/Tasks";

export default class PlexiUi {
    /**
     * @var { Tasks } tasks Tasks runner class object
     */
    public tasks: Tasks;

    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    public plexiCore: PlexiCore;

    /**
     * PlexiUi entry script
     */
    public constructor() {
        this.tasks = new Tasks(this);
        this.plexiCore = new PlexiCore();
    }
}