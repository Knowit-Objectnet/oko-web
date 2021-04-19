const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
        }),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                keycloak: {
                    test: /[\\/]node_modules[\\/](@react-keycloak|keycloak-js)/,
                    name: "keycloak"
                },
                formlibs: {
                    test: /[\\/]node_modules[\\/](react-hook-form|yup|@hookform)/,
                    name: "formlibs"
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -10
                }
            }
        }
    },
};
