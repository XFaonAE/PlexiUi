import CommandHelper from "@axeridev/plexi-core-terminal/src/CommandHelper";
import HelpCommand from "./commands/HelpCommand";
import DevCommand from "./commands/DevCommand";
import InitCommand from "./commands/InitCommand";

export default class InitCommands {
	/**
	 * Initialize all commands
	 * @param { CommandHelper } commandHelper CommandHelper class object
	 */
	public constructor(commandHelper: CommandHelper) {
		new HelpCommand(commandHelper);
		new DevCommand(commandHelper);
		new InitCommand(commandHelper);
	}
}