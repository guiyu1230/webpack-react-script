'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const config = require('../build/webpack.prod');

function build() {
    let compiler = webpack(config);
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if(err) {
                reject(err);
            }
            resolve(stats);
        })
    })
}

build().then(stats => {
    const info = stats.toJson();
    if(stats.hasErrors()) {
        console.error(info.errors)
    }
    if(stats.hasWarnings()) {
        console.warning(info.warning)
    }
}).catch(err => {
    console.log(chalk.red('Failed to compile.\n'));
    process.exit(1);
})