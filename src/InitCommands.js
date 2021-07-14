"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HelpCommand_1 = __importDefault(require("./commands/HelpCommand"));
var DevCommand_1 = __importDefault(require("./commands/DevCommand"));
var InitCommand_1 = __importDefault(require("./commands/InitCommand"));
var InitCommands = /** @class */ (function () {
    /**
     * Initialize all commands
     * @param { CommandHelper } commandHelper CommandHelper class object
     */
    function InitCommands(commandHelper) {
        new HelpCommand_1.default(commandHelper);
        new DevCommand_1.default(commandHelper);
        new InitCommand_1.default(commandHelper);
    }
    return InitCommands;
}());
exports.default = InitCommands;
