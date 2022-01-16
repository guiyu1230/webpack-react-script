const webpack = require('webpack');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('./webpack.common');

module.exports = merge(config, {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        // new BundleAnalyzerPlugin(),  // 使用默认配置
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: "./dist",
        hot: true
    }
})