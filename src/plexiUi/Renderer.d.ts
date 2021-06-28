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
     * Start resource copy
     * @param { Events } options Full set of options
     * @param { CallableFunction } callback Callback event listener
     */
    startCopy(options: any, callback?: CallableFunction): void;
    /**
     * Start the renderer process
     * @param { CallableFunction } callback Callback event listener
     * @return { this } Self
     */
    startRenderer(callback?: CallableFunction): this;
    /**
     * Attach all component change listeners
     * @param options Full framework options
     * @param { CallableFunction } callback Callback to trigger on events
     */
    attachResourceEvent(options: any, callback?: CallableFunction): void;
}
//# sourceMappingURL=Renderer.d.ts.map