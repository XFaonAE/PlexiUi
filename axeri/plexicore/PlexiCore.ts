import Terminal from "./core/terminal/Terminal";

export default class PlexiCore {
    /**
     * @var { Terminal } terminal Terminal class object
     */
    public terminal: Terminal;

    /**
     * PlexiCore entry
     */
    public constructor() {
        this.terminal = new Terminal();
    }
}