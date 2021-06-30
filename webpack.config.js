const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: "./src/vue/Main.js",
    node: {
        __dirname: false
    },
    output: {
        path: path.join(__dirname, "./src/vue/cache/build")
    },
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
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/vue/cache/render/Public.html"
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
