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
    public lastMessage: string = "";

    /**
     * Terminal entry
     */
    public constructor() {
        this.frameInterval = 100;
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
            chalk.hex("#50ffab")("|"),
            chalk.hex("#50ffab")("/"),
            chalk.hex("#50ffab")("─"),
            chalk.hex("#50ffab")("\\")
        ];

        let frame = 0;
        this.animator = setInterval(() => {
            if (frame > frames.length - 1) {
                frame = 0;
            }

            process.stdout.write("\r" + frames[frame] + " " + message);
            frame++;
        }, this.frameInterval);
    }

    /**
     * End animation with a status indicator
     * @param { "success" | "warning" | "alert" } status Status indicator
     * @param { string } newMessage New message
     */
    public endAnimation(status: "success" | "warning" | "error", newMessage: string = "") {
        let hex = "#fff";
        switch (status) {
            case "success":
                hex = "#50ffab";
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

        let message = "";
        if (newMessage) {
            message = newMessage + " ".repeat(this.lastMessage.length - newMessage.length);
        }

        process.stdout.write("\r" + chalk.hex(hex)("●") + " " + message + "\n");
    }
}