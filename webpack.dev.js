const path = require('path');

const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
            },
        ]
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        open: true,
        historyApiFallback: true,
    },
    // Ignoring warnings from packages that source-map-loader is unable to map correctly:
    ignoreWarnings: [/Failed to parse source map/],
});
