import chalk from "chalk";
import readline from "readline";
import Terminal from "./Terminal";

export default class Helper {
    /**
     * @var { Array<any> } commandRegister All registered commands
     */
    public commandRegister: Array<any>;

    /**
     * @var { Terminal } terminal Terminal class object
     */
    public terminal: any;

    /**
     * @var { boolean } listenNext Listen for next command
     */
    public listenNext: boolean;

    /**
     * Command helper
     * @param { PlexiCore } plexiCore PlexiCore class object
     */
    public constructor(terminal: Terminal) {
        this.terminal = terminal;
        this.commandRegister = [];
        this.listenNext = false;
    }

    /**
     * Start command listener
     */
    public startListener() {
        this.listenNext = true;
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const listenNext = () => {
            rl.question(chalk.hex("#50ffff")("> "), (data: string) => {
                this.getCommand(data, (event: any) => {});

                if (this.listenNext) {
                    listenNext();
                }
            });
        }

        listenNext();
    }

    /**
     * Stop listening for commands
     */
     public stopListener() {
         this.listenNext = false;
    }

    /**
     * Get a command
     * @param { string } command Raw command
     * @param { CallableFunction } eventCallback Event callback
     */
    public getCommand(command: string, eventCallback: CallableFunction) {
        let commandObject: any;
        let commandFound = false;

        this.commandRegister.forEach((value: any, index: number) => {
            if (!commandFound) {
                if (value.keyword == command.split(" ")[0]) {
                    commandFound = true;
                    commandObject = value;
                }
            }
        });

        if (commandFound) {
            commandObject.run(command.split(" "));
            eventCallback({
                status: "success",
                command: command
            });
            return;
        }

        eventCallback({
            status: "error",
            info: "COMMAND_NOT_FOUND",
            command: command
        });
    }
}