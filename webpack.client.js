const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const config = {
    // Tell webpack the root file of our client application
    entry: "./src/client/client.js",
    // Tell webpack where to put the output file that is generated
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"), //path is a helper module,  __dirname (is current working directory there project is executing in), build new folder automatically will create inside this
    },
};

module.exports = merge(baseConfig, config);
