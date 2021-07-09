"use strict";
var path = require("path");
module.exports = {
    publicPath: process.env.NODE_ENV == "production" ? "./" : "/",
    outputDir: path.join(__dirname, "./axeri/plexiui/renderer/build"),
    configureWebpack: {
        node: {
            __dirname: false,
            __filename: false
        }
    },
    pages: {
        index: {
            entry: path.join(__dirname, "./axeri/plexiui/renderer/Renderer.js")
        }
    }
};
