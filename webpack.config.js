const path = require('path');

module.exports = {
    entry: "./src/scripts/app.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        loaders: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }          
        ]
    }
};