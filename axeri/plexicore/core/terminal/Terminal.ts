import chalk from "chalk";

export default class Terminal {
    /**
     * @var { number } frameInterval Frame change delay
     */
    public frameInterval: number;

    /**
     * @var { NodeJS.Timer } animator Animation frame loop
     */
    public animator: NodeJS.Timer | undefined;

    /**
     * @var { string } lastMessage Last used message
     */
    public lastMessage: string;

    /**
     * Terminal entry
     */
    public constructor() {
        this.frameInterval = 100;
        this.lastMessage = "";
    }

    /**
     * Write a message with an animation
     */
    public writeAnimation(message: string) {
        this.lastMessage = message;
        if (typeof this.animator !== "undefined") {
            clearInterval(this.animator);
        }

        const frames = [
            chalk.hex("#50ffff")("|"),
            chalk.hex("#50ffff")("/"),
            chalk.hex("#50ffff")("─"),
            chalk.hex("#50ffff")("\\")
        ];

        let frame = 0;
        this.animator = setInterval(() => {
            if (frame > frames.length - 1) {
                frame = 0;
            }

            process.stdout.write("\r" + frames[frame] + " " + this.lastMessage);
            frame++;
        }, this.frameInterval);
    }

    /**
     * Write a finished indicator with a status identifier
     * @param { "success" | "warning" | "alert" } status Status indicator
     * @param { string } newMessage New message
     */
    public done(status: "success" | "warning" | "error", newMessage: string = "") {
        let hex = "#fff";
        switch (status) {
            case "success":
                hex = "#50ffff";
                break;

            case "warning":
                hex = "#ffff55";
                break;

            case "error":
                hex = "#ff5555";
                break;
        }

        if (typeof this.animator !== "undefined") {
            clearInterval(this.animator);
        }

        if (typeof this.lastMessage == undefined) {
            this.lastMessage = "";
        }

        let message = "";
        if (newMessage) {
            let overflow = this.lastMessage.length - newMessage.length;
            if (overflow < 0) {
                overflow = 0;
            }

            message = newMessage + " ".repeat(overflow);
        }

        process.stdout.write("\r" + chalk.hex(hex)("•") + " " + message + "\n");
    }
}