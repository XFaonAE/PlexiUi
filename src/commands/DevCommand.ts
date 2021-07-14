import CommandHelper from "@axeridev/plexi-core-terminal/src/CommandHelper";

export default class DevCommand {
	/**
	 * Main method
	 * @param { CommandHelper } commandHelper CommandHelper class object
	 */
	public constructor(commandHelper: CommandHelper) {
		commandHelper
			.addCommand({
				trigger: "dev",
				desc: "Run the application in development mode",
				onTrigger: (args: Array<string>) => {
					commandHelper.plexiCoreTerminal.animation.animate("Starting development server");
				}
			});
	}
}