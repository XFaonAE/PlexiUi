"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dev_1 = __importDefault(require("./dev/Dev"));
var Tasks = /** @class */ (function () {
    /**
     * Tasks runner class
     * @param { PlexiUi } plexiUi PlexiUi class object
     */
    function Tasks(plexiUi) {
        this.plexiUi = plexiUi;
    }
    /**
     * Run the dev task
     */
    Tasks.prototype.dev = function () {
        var dev = new Dev_1.default();
        dev.run(this);
    };
    return Tasks;
}());
exports.default = Tasks;
