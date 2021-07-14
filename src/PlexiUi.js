#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plexi_core_terminal_1 = __importDefault(require("@axeridev/plexi-core-terminal"));
var InitCommands_1 = __importDefault(require("./InitCommands"));
new /** @class */ (function () {
    /**
     * PlexiUI framework entry class
     */
    function Main() {
        var pcTerminal = this.plexiCoreTerminal = new plexi_core_terminal_1.default();
        pcTerminal.section("PlexiUI");
        new InitCommands_1.default(pcTerminal.commandHelper);
        pcTerminal.commandHelper.run(process.argv.splice(2));
    }
    return Main;
}());
