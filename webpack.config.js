const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

// Provides the styled component names for run-time (so they are displayed in React DevTools)
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
    // process.env.NODE_ENV is 'development' by default
    mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
    devtool: (process.env.NODE_ENV === 'production')  ? 'source-map' : 'inline-source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[fullhash].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: (process.env.NODE_ENV !== 'production') && {
                    getCustomTransformers: () => ({before: [styledComponentsTransformer]}),
                },
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff2|woff|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            {
                test: /\.svg$/,
                use: ['svg-react-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new Dotenv({
            // Loading environment variables from `.env`-file, if present. These variables can be referenced in
            // the source code with "process.env.VAR_NAME", and will be replaced at build time.
            // Next line also enables loading of environment variables from executing CLI session (for CI/CD purposes).
            // System environment variables takes presedence over those loaded from `.env` files.
            systemvars: true
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        open: true,
        historyApiFallback: true,
    },
}
