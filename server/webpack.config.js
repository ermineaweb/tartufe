const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "server.js"
    },
    mode: "development",
    target: "node",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-runtime",
                        ]
                    }
                },
            },
        ]
    },
    node: {
        __dirname: false,
        __filename: false,
        net: "empty"
    },
    externals: [nodeExternals()],
};