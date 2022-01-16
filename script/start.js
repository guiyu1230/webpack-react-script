'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../build/webpack.dev');

const compiler = webpack(config);

const serverConfig = {
    compress: true,
    hot: true,
    open: true
}

const devServer = new WebpackDevServer(compiler, serverConfig);

devServer.listen(3000);

['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
        devServer.close();
        process.exit();
    });
});