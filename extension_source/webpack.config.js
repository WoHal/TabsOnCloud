const path = require('path');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname + '/dist',
        filename: 'popup.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}