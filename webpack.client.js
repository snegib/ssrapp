const path = require("path");

module.exports = {
    // Tell webpack the root file of our client application
    entry: "./src/client/client.js",
    // Tell webpack where to put the output file that is generated
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"), //path is a helper module,  __dirname (is current working directory there project is executing in), build new folder automatically will create inside this
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
