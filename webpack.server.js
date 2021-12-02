const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const webpackNodeExternals = require("webpack-node-externals");

// this file is allow our JSX code on server.

const config = {
    //inform webpack that we are building a bundle for nodeJS,rather than for the browser
    target: "node",
    // Tell webpack the root file of our server application
    entry: "./src/index.js",
    // Tell webpack where to put the output file that is generated
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"), //path is a helper module,  __dirname (is current working directory there project is executing in), build new folder automatically will create inside this
    },
    // exclude node modules
    externals: [webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);
