const path = require('path');

module.exports = {
    entry: "./src/scripts/app.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }          
        ]
    }
};