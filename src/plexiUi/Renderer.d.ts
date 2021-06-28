/// <reference types="node" />
import { ChildProcessWithoutNullStreams } from "child_process";
import PlexiUi from "../PlexiUi";
export default class Renderer {
    /**
     * @var { PlexiUi } plexiUi PlexiUi class object
     */
    plexiUi: PlexiUi;
    /**
     * @var { ChildProcessWithoutNullStreams } renderer Renderer process
     */
    renderer: ChildProcessWithoutNullStreams | null;
    /**
     * @var { boolean } readyTriggered Has the ready event triggered
     */
    readyTriggered: boolean;
    /**
     * Class managing all processes of the renderer
     */
    constructor(plexiUi: PlexiUi);
    /**
     * Start the renderer process
     * @param { CallableFunction } callback Callback event listener
     * @return { this } Self
     */
    startRenderer(callback?: CallableFunction): this;
}
//# sourceMappingURL=Renderer.d.ts.map