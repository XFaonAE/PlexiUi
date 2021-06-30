import PlexiCore from "@axeridev/plexi-core";
export interface DevOptions {
    renderRoot: string;
    logStatus: boolean;
    runnerOptions: any;
    skip: {
        vue: boolean;
        electron: boolean;
    };
}
export interface DevEvent {
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
    callbackEvent: CallableFunction | undefined;
    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    plexiCore: PlexiCore;
    /**
     * @var { DevOptions } options Options
     */
    options: DevOptions | undefined;
    /**
     * PlexiUi framework
     */
    constructor();
    /**
     * PlexiUi framework dev runner
     * @param { object } rawOptions Options
     * @param { CallableFunction } callback On event callback
     */
    dev(rawOptions?: object, callback?: CallableFunction): void;
    /**
     * Package application
     * @param { object } rawOptions Options
     */
    package(rawOptions?: object): void;
    /**
     * Log current status if allowed
     * @param { string } message Status message
     * @param { string } newState New state for spinner
     */
    logStat(message?: string | null, newState?: string | null): void;
    /**
     * Exit framework
     */
    exit(): void;
}
//# sourceMappingURL=PlexiUi.d.ts.map