const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin() // Cleans out  the ´dist´ folder before each build
    ]
});
