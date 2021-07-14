"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DevCommand = /** @class */ (function () {
    /**
     * Main method
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    function DevCommand(commandHelper) {
        commandHelper
            .addCommand({
            trigger: "dev",
            desc: "Run the application in development mode",
            onTrigger: function (args) {
                commandHelper.plexiCoreTerminal.animation.animate("Starting development server");
            }
        });
    }
    return DevCommand;
}());
exports.default = DevCommand;
