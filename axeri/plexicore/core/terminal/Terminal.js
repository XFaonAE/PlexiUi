"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Terminal = /** @class */ (function () {
    /**
     * Terminal entry
     */
    function Terminal() {
        /**
         * @var { string } lastMessage Last used message
         */
        this.lastMessage = "";
        this.frameInterval = 100;
    }
    /**
     * Write a message with an animation
     */
    Terminal.prototype.writeAnimation = function (message) {
        this.lastMessage = message;
        if (typeof this.animator !== "undefined") {
            clearInterval(this.animator);
        }
        var frames = [
            chalk_1.default.hex("#50ffab")("|"),
            chalk_1.default.hex("#50ffab")("/"),
            chalk_1.default.hex("#50ffab")("─"),
            chalk_1.default.hex("#50ffab")("\\")
        ];
        var frame = 0;
        this.animator = setInterval(function () {
            if (frame > frames.length - 1) {
                frame = 0;
            }
            process.stdout.write("\r" + frames[frame] + " " + message);
            frame++;
        }, this.frameInterval);
    };
    /**
     * End animation with a status indicator
     * @param { "success" | "warning" | "alert" } status Status indicator
     * @param { string } newMessage New message
     */
    Terminal.prototype.endAnimation = function (status, newMessage) {
        if (newMessage === void 0) { newMessage = ""; }
        var hex = "#fff";
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
        var message = "";
        if (newMessage) {
            message = newMessage + " ".repeat(this.lastMessage.length - newMessage.length);
        }
        process.stdout.write("\r" + chalk_1.default.hex(hex)("●") + " " + message + "\n");
    };
    return Terminal;
}());
exports.default = Terminal;
