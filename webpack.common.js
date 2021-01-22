const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
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
};
