export interface ConstructorOptions {
    renderRoot: string;
    logStatus: boolean;
    runnerOptions: any;
    skip: {
        vue: boolean;
        electron: boolean;
    };
}
export interface ConstructorEvent {
    type: string;
}
export interface Procedure {
    runElectron: CallableFunction;
    runVue: CallableFunction;
}
export default class PlexiUi {
    /**
     * @var { CallableFunction } callbackEvent On event callback
     */
    callbackEvent: CallableFunction;
    /**
     * PlexiUi framework
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    constructor(rawOptions?: object, callback?: CallableFunction);
}
//# sourceMappingURL=PlexiUi.d.ts.map