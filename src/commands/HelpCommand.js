"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HelpCommand = /** @class */ (function () {
    /**
     * Main method
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    function HelpCommand(commandHelper) {
        commandHelper
            .addCommand({
            trigger: "help",
            desc: "Show a list of all the commands",
            onTrigger: function (args) {
                commandHelper
                    .helpPrint();
            }
        })
            .addCommand({
            desc: "",
            onTrigger: function (args) {
                commandHelper
                    .helpPrint();
            }
        });
    }
    return HelpCommand;
}());
exports.default = HelpCommand;
