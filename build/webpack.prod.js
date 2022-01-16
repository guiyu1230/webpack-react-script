const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require("./webpack.common");

module.exports = merge(config, {
    mode: "production",
    devtool: "source-map",
    plugins: [
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css/g, //根据正则匹配压缩
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    },
                    parser: require('postcss-safe-parser'),
                    autoprefixer: false
                },
                canPrint: true
            }),
            new UglifyJsPlugin({
                sourceMap: true
            })
        ],
        splitChunks: {
            chunks: "async",
            minSize: 3000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: { 
                    test: /[\\/]node_modules[\\/]/,  //匹配node_modules中的模块
                    priority: -10   //优先级,当模块同时命中多个缓存组的规则时，分配到优先级高的缓存组
                },
                default: {
                    minChunks: 2, //覆盖外层的全局属性
                    priority: -20,
                    reuseExistingChunk: true  //是否复用已经从原代码块中分割出来的模块
                }
            }
        }
    }
})