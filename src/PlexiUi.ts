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

		new InitCommands(this.plexiCoreTerminal.commandHelper);

		plexiCoreTerminal.commandHelper.run(process.argv.splice(2));
	}
}