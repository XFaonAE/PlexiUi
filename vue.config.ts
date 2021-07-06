const path = require("path");

module.exports = {
    indexPath: path.join(__dirname, "./src/index.html"),
    pages: {
        index: {
            entry: path.join(__dirname, "./axeri/plexiui/renderer/Renderer.js")
        }
    }
};