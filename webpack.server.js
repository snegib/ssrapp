const path = require("path");

// this file is allow our JSX code on server.

module.exports = {
    //inform webpack that we are building a bundle for nodeJS,rather than for the browser
    target: "node",
    // Tell webpack the root file of our server application
    entry: "./src/index.js",
    // Tell webpack where to put the output file that is generated
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"), //path is a helper module,  __dirname (is current working directory there project is executing in), build new folder automatically will create inside this
    },

    // Tell webpack to run babel in every file it runs through
    // here is the structure of that module define
    // module: {
    //     rules: [{
    //         //single object
    //     }]
    // }
    module: {
        rules: [
            {
                test: /\.js?$/, // reg express
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        "react",
                        "stage-0",
                        ["env", { targets: { brosers: ["last 2 versions"] } }],
                    ],
                },
            },
        ],
    },
};
