import PlexiUi from "../PlexiUi";
export interface PackageOptions {
    out: string;
}
export interface PackagerEvent {
    type: string;
    data: any;
}
export default class Packager {
    /**
     * @var { PlexiUi } plexiUi PlexiUi class object
     */
    plexiUi: PlexiUi;
    /**
     * Packager class
     * @param { PlexiUi } plexiUi PlexiUi class object
     */
    constructor(plexiUi: PlexiUi);
    /**
     * Run packager
     * @param { object } rawOptions Options
     * @param { CallableFunction } eventCallback Event callback
     */
    pack(rawOptions: object, eventCallback: CallableFunction): void;
}
//# sourceMappingURL=Packager.d.ts.map