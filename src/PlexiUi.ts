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
		const pcTerminal = this.plexiCoreTerminal = new PlexiCoreTerminal();
		pcTerminal.section("PlexiUI");

		new InitCommands(pcTerminal.commandHelper);

		pcTerminal.commandHelper.run(process.argv.splice(2));
	}
}