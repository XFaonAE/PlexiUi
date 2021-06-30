import path from "path";

export interface ConstructorOptions {
    renderRoot: string;
    logStatus: boolean;
}

export interface ConstructorEvent {

}

export default class PlexiUi {
    /**
     * @var { CallableFunction } callbackEvent On event callback
     */
    public callbackEvent: CallableFunction;

    /**
     * PlexiUi framework
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    public constructor(rawOptions: object = {}, callback: CallableFunction = () => {}) {
        this.callbackEvent = callback;

        const optionsDefault: ConstructorOptions = {
            renderRoot: path.join(<string><unknown>require.main, "./render"),
            logStatus: true
        };
    }
}