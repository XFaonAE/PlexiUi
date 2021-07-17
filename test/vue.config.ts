import * as path from "path";

module.exports = {
    outputDir: path.join("./src/build/html"),
    publicPath: process.env.NODE_ENV == "production" ? "./" : "/",
	pages: {
		index: {
			entry: path.join(__dirname, "./src/vue/Vue.js")
		}
	}
}
