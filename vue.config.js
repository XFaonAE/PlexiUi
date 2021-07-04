module.exports = {
    outputDir: "plexiui/renderer/cache/build",
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    pages: {
        index: {
            entry: "plexiui/renderer/Renderer.js"
        }
    }
}