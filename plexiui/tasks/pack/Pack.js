"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var Pack = /** @class */ (function () {
    function Pack() {
    }
    /**
     * Run the application packer
     * @param { Tasks } tasks Tasks class object
     */
    Pack.prototype.run = function (tasks) {
        var plexiCore = tasks.plexiUi.plexiCore;
        plexiCore.terminal.dividerCreate("PlexiUi | Pack");
        this.packRenderer(function (event) {
            switch (event.status) {
                case "starting":
                    plexiCore.terminal.animation.write("Packing renderer content");
                    break;
                case "ready":
                    plexiCore.terminal.animation.write("Packed renderer content after " + event.timeSpent + "s");
                    plexiCore.terminal.animation.exitSpinner("success");
                    break;
                case "error":
                    plexiCore.terminal.animation.write("Failed to pack renderer content");
                    plexiCore.terminal.animation.exitSpinner("error");
                    break;
            }
        });
    };
    /**
     * Pack renderer content
     * @param { CallableFunction } eventCallback Event callback
     */
    Pack.prototype.packRenderer = function (eventCallback) {
        var _a;
        if (eventCallback === void 0) { eventCallback = function () { }; }
        var time = 0;
        var timer = setInterval(function () {
            time++;
        }, 1000);
        eventCallback({
            status: "starting"
        });
        var rendererPacker = child_process_1.exec("npx vue-cli-service build");
        var initialReady = false;
        (_a = rendererPacker.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
            if (!initialReady) {
                if (data.startsWith(" DONE")) {
                    initialReady = true;
                    clearInterval(timer);
                    eventCallback({
                        status: "ready",
                        timeSpent: time
                    });
                }
            }
        });
    };
    return Pack;
}());
exports.default = Pack;
