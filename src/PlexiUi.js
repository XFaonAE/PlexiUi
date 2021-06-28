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
        this.plexiCore = new plexi_core_1.default();
    }
    /**
     * Run framework code logic
     * @param { object } rawOptions Options
     */
    PlexiUi.prototype.run = function (rawOptions) {
        var _this = this;
        var templateOptions = {
            renderDir: ""
        };
        var options = Object.assign(templateOptions, rawOptions);
        var renderer = new Renderer_1.default(this);
        var window = new Window_1.default(this);
        renderer.plexiUi.plexiCore.terminal.dividerCreate("PlexiUi | Renderer");
        renderer.startCopy(options, function (event) {
            switch (event.type) {
                case "status":
                    switch (event.data.status) {
                        case "starting":
                            _this.plexiCore.terminal.writeSpinner("Starting Html renderer resource copy...");
                            break;
                        case "error":
                            _this.plexiCore.terminal.writeSpinner("Failed to copy Html renderer resources after " + event.data.timeTaken + "s");
                            _this.plexiCore.terminal.exitSpinner("error");
                            _this.plexiCore.terminal.dividerCreate("PlexiUi | Failed", {
                                barHex: "#ff7777",
                                titleHex: "#ff7777"
                            });
                            console.error(event.data.dump);
                            process.exit(0);
                            break;
                        case "ready":
                            _this.plexiCore.terminal.writeSpinner("Html renderer resource copy finished after " + event.data.timeTaken + "s");
                            _this.plexiCore.terminal.exitSpinner("success");
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
                                                _this.plexiCore.terminal.dividerCreate("PlexiUi | Failed", {
                                                    barHex: "#ff7777",
                                                    titleHex: "#ff7777"
                                                });
                                                console.error(event.data.dump);
                                                process.exit(0);
                                                break;
                                        }
                                        break;
                                }
                            });
                            break;
                    }
                    break;
            }
        });
    };
    return PlexiUi;
}());
exports.default = PlexiUi;
