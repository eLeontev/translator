const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,
    stats: 'errors-warnings',
    entry: './src/index.tsx',
    devtool: 'source-map',
    optimization: {
        runtimeChunk: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
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
                            '@babel/preset-react',
                        ],
                    },
                },
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
    plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
};
