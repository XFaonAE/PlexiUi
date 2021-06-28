"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer_1 = __importDefault(require("./plexiUi/Renderer"));
var plexi_core_1 = __importDefault(require("@axeridev/plexi-core"));
var Window_1 = __importDefault(require("./plexiUi/Window"));
var PlexiUi = /** @class */ (function () {
    /**
     * PlexiUi entry class
     */
    function PlexiUi() {
        var _this = this;
        this.plexiCore = new plexi_core_1.default();
        var renderer = new Renderer_1.default(this);
        var window = new Window_1.default(this);
        renderer.plexiUi.plexiCore.terminal.dividerCreate("PlexiUi | Renderer");
        renderer.startRenderer(function (event) {
            switch (event.type) {
                case "status":
                    switch (event.data.status) {
                        case "starting":
                            _this.plexiCore.terminal.writeSpinner("Starting Html renderer...");
                            break;
                        case "ready":
                            _this.plexiCore.terminal.writeSpinner("Html renderer started after " + event.data.timeTaken + "s");
                            _this.plexiCore.terminal.exitSpinner("success");
                            window.startWindow(function (event) {
                                switch (event.type) {
                                    case "status":
                                        switch (event.data.status) {
                                            case "starting":
                                                _this.plexiCore.terminal.dividerCreate("PlexiUi | Window");
                                                _this.plexiCore.terminal.writeSpinner("Starting window process...");
                                                break;
                                            case "ready":
                                                _this.plexiCore.terminal.writeSpinner("Window process started after " + event.data.timeTaken + "s");
                                                _this.plexiCore.terminal.exitSpinner("success");
                                                break;
                                        }
                                        break;
                                }
                            });
                            break;
                        case "error":
                            _this.plexiCore.terminal.writeSpinner("Html renderer failed to start after " + event.data.timeTaken + "s");
                            _this.plexiCore.terminal.exitSpinner("error");
                            renderer.plexiUi.plexiCore.terminal.dividerCreate("PlexiUi | Failed", {
                                barHex: "#ff7777",
                                titleHex: "#ff7777"
                            });
                            console.log(event.data.dump);
                            process.exit(0);
                            break;
                    }
                    break;
            }
        });
    }
    return PlexiUi;
}());
exports.default = PlexiUi;
