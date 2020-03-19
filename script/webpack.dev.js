const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const webpackConfig = require('./webpack.config');
const paths = require('./paths');

module.exports = WebpackMerge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: require.resolve('typescript', {
                basedir: paths.appNodeModules
            }),
            tslint: false,
            async: true,
            useTypescriptIncrementalApi: true,
            checkSyntacticErrors: true,
            tsconfig: paths.appTsConfig,
            compilerOptions: {
                jsx: 'preserve',
                checkJs: false
            },
            reportFiles: ['**/*.(ts|tsx)', '!**/__tests__/**', '!**/?(*.)(spec|test).*'],
            watch: paths.appSrc,
            silent: true
        }),
    ],
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    }
})