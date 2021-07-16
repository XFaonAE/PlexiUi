import * as path from "path";

module.exports = {
    outputDir: path.join("./dist/html"),
    publicPath: process.env.NODE_ENV == "production" ? "./" : "/",
    pages: {
        index: {
            entry: path.join(__dirname, "./src/vue/Vue.js")
        }
    }
}
