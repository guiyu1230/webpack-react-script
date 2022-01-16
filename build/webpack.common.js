const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: './src/index.tsx'
    },
    output: {
        filename: 'static/js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            title: 'web app'
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash:5].css'
        }),
    ],
    resolve: {
        // 引入模块的时候可以省略这些后缀
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: "images/",
                    limit: 102400
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|oft)$/,
                loader: 'file-loader'
            }
        ]
    }
}