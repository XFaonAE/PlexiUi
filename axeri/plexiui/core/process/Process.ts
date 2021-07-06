import { exec } from "child_process";
import path from "path";

export default class Process {
  /**
   * Run a core processes
   * @param { "renderer" | "window" } processName Name of the process to run
   * @param { CallableFunction } eventCallback Callback for all events
   */
  public run(processName: "renderer" | "window", eventCallback: CallableFunction) {
    let time = 0;
    let timer = setInterval(() => {
      time++;
    }, 1000);

    switch (processName) {
      case "renderer":
        const renderer = exec("npx vue-cli-service serve", {
          cwd: path.join(__dirname, "../../../../")
        });
        var ready = false;

        renderer.stdout?.on("data", (data: string) => {
          if (!ready) {
            if (data.startsWith(" DONE")) {
              ready = true;
              clearInterval(timer);

              eventCallback({
                status: "done",
                after: time + "s",
                process: renderer
              });
            }
          }
        });
        break;
      
      case "window":
        const window = exec("npx electron ./", {
          cwd: path.join(__dirname, "../../../../")
        });
        var ready = false;

        window.stdout?.on("data", (data: string) => {
          if (!ready) {
            ready = true;
            clearInterval(timer);

            eventCallback({
              status: "done",
              process: window,
              after: time + "s"
            });
          }
        });
        break;
    }
  }
}