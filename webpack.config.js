const path = require('path');

module.exports = {
    entry: "./src/scripts/app.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'typescript'
            }          
        ]
    }
};