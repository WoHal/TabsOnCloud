const ExtractCssPlugin = require('extract-css-chunks-webpack-plugin');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname + '/extension',
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
            }, {
                test: /\.s?css$/,
                use: [
                    {
                        loader: ExtractCssPlugin.loader,
                        options: {
                            hot: true,
                            modules: true
                        }
                    }, {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new ExtractCssPlugin({
            filename: 'popup.css'
        })
    ]
}