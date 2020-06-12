const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    watch: true,
    stats: 'errors-warnings',
    entry: './index.ts',
    devtool: 'source-map',
    optimization: {
        runtimeChunk: true,
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        esmodules: true,
                                    },
                                },
                            ],
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    mode: 'development',
    devServer: {
        clientLogLevel: 'error',
        contentBase: './build',
        compress: true,
        port: 9000,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ template: './index.html' }),
    ],
};
