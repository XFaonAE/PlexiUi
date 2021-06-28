/// <reference types="node" />
import { ChildProcessWithoutNullStreams } from "child_process";
export default class Renderer {
    /**
     * @var { ChildProcessWithoutNullStreams } renderer Renderer process
     */
    renderer: ChildProcessWithoutNullStreams | null;
    /**
     * Class managing all processes of the renderer
     */
    constructor();
    /**
     * Start the renderer process
     * @param { object } rawOptions Any startup options
     * @param { CallableFunction } callback Callback event listener
     * @return { this } Self
     */
    startRenderer(rawOptions?: object, callback?: CallableFunction): this;
}
//# sourceMappingURL=Renderer.d.ts.map