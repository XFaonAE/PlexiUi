import PlexiCoreTerminal from "@axeridev/plexi-core-terminal";
import CommandHelper from "@axeridev/plexi-core-terminal/src/CommandHelper";
import * as fse from "fs-extra";
import * as path from "path";
import * as readline from "readline";

export default class InitCommand {
	/**
	 * Main method
	 * @param { CommandHelper } commandHelper CommandHelper class object
	 */
	public constructor(commandHelper: CommandHelper) {
		commandHelper
			.addCommand({
				trigger: "init",
				desc: "Initialize a new PlexiUi project",
				onTrigger: (args: Array<string>) => {
					const plexiCoreTerminal = new PlexiCoreTerminal();

					const initProject = {
						packageJson: {
							main: "./src/Electron/Electron.js",
							description: "",
							name: "",
							version: "",
							author: "",
							scripts: {
								"dev": "plexi-ui dev",
								"build": "plexi-ui build"
							},
							keywords: [
								""
							],
							dependencies: {
								"core-js": "^3.6.5",
								"vue": "^3.0.0",
								"vue-router": "^4.0.0-0",
								"vuex": "^4.0.0-0"
							},
							devDependencies: {
								"@vue/cli-plugin-babel": "~4.5.0",
								"@vue/cli-plugin-router": "~4.5.0",
								"@vue/cli-plugin-vuex": "~4.5.0",
								"@vue/cli-service": "~4.5.0"
							}
						}
					};

					const getProjectInfo = (finished: CallableFunction) => {
						const ask = {
							projectName: (done: CallableFunction) => {
								plexiCoreTerminal.ask("Project Name [ plexi-ui-project ]", (data: string) => {
									initProject.packageJson.name = data != "" ? data.toLowerCase() : "plexi-ui-project";
									done();
								});
							},
							desc: (done: CallableFunction) => {
								plexiCoreTerminal.ask("Project Description [ PlexiUI Project ]", (data: string) => {
									initProject.packageJson.description = data != "" ? data : "PlexiUI Project";
									done();
								});
							},
							author: (done: CallableFunction) => {
								plexiCoreTerminal.ask("Author [ Unknown ]", (data: string) => {
									initProject.packageJson.author = data != "" ? data : "Unknown";
									done();
								});
							},
							version: (done: CallableFunction) => {
								plexiCoreTerminal.ask("Version [ 0.0.1 ]", (data: string) => {
									initProject.packageJson.version = data != "" ? data : "0.0.1";
									done();
								});
							},
							keywords: (done: CallableFunction) => {
								plexiCoreTerminal.ask("Keywords", (data: string) => {
									initProject.packageJson.keywords = data != "" ? data.split(" ") : [];
									done();
								});
							}
						};

						ask.projectName(() => {
							ask.desc(() => {
								ask.author(() => {
									ask.version(() => {
										ask.keywords(() => {
											finished();
										});
									});
								});
							});
						});
					}

					getProjectInfo(() => {
						plexiCoreTerminal.animation.animate("Creating project");

						fse.copySync(path.join(__dirname, "./init/template/"), path.join(process.cwd(), "./"), {
							overwrite: true
						});

						fse.writeFile(path.join(process.cwd(), "./package.json"), JSON.stringify(initProject.packageJson, null, 2), (error: any) => {
							error ? console.log(error) : null;

							plexiCoreTerminal.animation.end("success", "Project created!");
						});

						plexiCoreTerminal.rl.close();
					});
				}
			});
	}
}