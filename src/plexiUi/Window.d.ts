import PlexiUi from "../PlexiUi";
export default class Window {
    /**
     * @var { PlexiUi } plexiUi PlexiUi class object
     */
    plexiUi: PlexiUi;
    /**
     * Window process manager
     * @param { PlexiUi } plexiUi PlexiUi class object
     */
    constructor(plexiUi: PlexiUi);
    /**
     * Start the window process
     * @param { CallableFunction } callback Callback for events
     */
    startWindow(callback?: CallableFunction): void;
}
//# sourceMappingURL=Window.d.ts.map