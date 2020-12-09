const path = require('path');

const { merge } = require('webpack-merge')
const common = require('./webpack.common')

// Provides the styled component names for run-time (so they are displayed in React DevTools)
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    getCustomTransformers: () => ({before: [styledComponentsTransformer]}),
                },
            },
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        open: true,
        historyApiFallback: true,
    },
});
