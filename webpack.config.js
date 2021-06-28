const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/renderer/Renderer.js",
    module: {
        rules: [
        {
            test: /\.js$/, use: "babel-loader"
        },
        {
            test: /\.vue$/, use: "vue-loader" 
        },
        { 
            test: /\.css$/, use: [
                "vue-style-loader",
                "css-loader"
            ]
        },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/renderer/public/Public.html"
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
    };