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
        var plexiCoreTerminal = this.plexiCoreTerminal = new plexi_core_terminal_1.default();
        process.stdin.setRawMode(true);
        process.stdin.setEncoding("ascii");
        process.stdin.on("data", function (data) {
            if (data == "\x03") {
                plexiCoreTerminal.write("Application stopped");
                process.exit(0);
            }
        });
        new InitCommands_1.default(this.plexiCoreTerminal.commandHelper);
        plexiCoreTerminal.commandHelper.run(process.argv.splice(2));
    }
    return Main;
}());
