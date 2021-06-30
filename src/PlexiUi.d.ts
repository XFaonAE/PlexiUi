import PlexiCore from "@axeridev/plexi-core";
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
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    plexiCore: PlexiCore;
    /**
     * @var { ConstructorOptions } options Options
     */
    options: ConstructorOptions;
    /**
     * PlexiUi framework
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    constructor(rawOptions?: object, callback?: CallableFunction);
    /**
     * Log current status if allowed
     * @param { string } message Status message
     * @param { string } newState New state for spinner
     */
    logStat(message?: string | null, newState?: string | null): void;
}
//# sourceMappingURL=PlexiUi.d.ts.map