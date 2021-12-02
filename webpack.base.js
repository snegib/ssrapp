module.exports = {
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
