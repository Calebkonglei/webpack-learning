const Webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackMerge = require('webpack-merge');
module.exports = WebpackMerge(webpackConfig, {
    mode: 'development',
    // entry: ["@babel/polyfill",path.resolve(__dirname,'../src/index.js')],
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    }
})