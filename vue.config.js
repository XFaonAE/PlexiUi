"use strict";
var path = require("path");
module.exports = {
    publicPath: process.env.NODE_ENV == "production" ? "./" : "/",
    outputDir: path.join(__dirname, "./axeri/plexiui/renderer/build"),
    pages: {
        index: {
            entry: path.join(__dirname, "./axeri/plexiui/renderer/Renderer.js")
        }
    }
};
