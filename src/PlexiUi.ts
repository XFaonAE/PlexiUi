#!/usr/bin/env node

import PlexiCoreTerminal from "@axeridev/plexi-core-terminal";
import InitCommands from "./InitCommands";

new class Main {
	/**
	 * @var { PlexiCoreTerminal } plexiCoreTerminal PlexiCoreTerminal class object
	 */
	public plexiCoreTerminal: PlexiCoreTerminal;

	/**
	 * PlexiUI framework entry class
	 */
	public constructor() {
        const plexiCoreTerminal = this.plexiCoreTerminal = new PlexiCoreTerminal();

        process.stdin.setRawMode(true);
        process.stdin.setEncoding("ascii");
        process.stdin.on("data", (data: any) => {
            if (data == "\x03") {
                plexiCoreTerminal.write("Application stopped");
                process.exit(0);
            }
        });

		new InitCommands(this.plexiCoreTerminal.commandHelper);

		plexiCoreTerminal.commandHelper.run(process.argv.splice(2));
	}
}