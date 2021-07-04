"use strict";
/**
 * @copyright AxeriDev LLC
 * @version 0.0.1
 * @author AxeriDev <support@axeri.net>
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plexi_core_1 = __importDefault(require("@axeridev/plexi-core"));
var Tasks_1 = __importDefault(require("./tasks/Tasks"));
var PlexiUi = /** @class */ (function () {
    /**
     * PlexiUi entry script
     */
    function PlexiUi() {
        this.tasks = new Tasks_1.default(this);
        this.plexiCore = new plexi_core_1.default();
    }
    return PlexiUi;
}());
exports.default = PlexiUi;
