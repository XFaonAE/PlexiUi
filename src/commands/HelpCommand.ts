import CommandHelper from "@axeridev/plexi-core-terminal/src/CommandHelper";

export default class HelpCommand {
	/**
	 * Main method
	 * @param { CommandHelper } commandHelper CommandHelper class object
	 */
	public constructor(commandHelper: CommandHelper) {
		commandHelper
			.addCommand({
				trigger: "help",
				desc: "Show a list of all the commands",
				onTrigger: (args: Array<string>) => {
					commandHelper
						.helpPrint();
				}
			})
			.addCommand({
				desc: "",
				onTrigger: (args: Array<string>) => {
					commandHelper
						.helpPrint();
				}
			});
	}
}