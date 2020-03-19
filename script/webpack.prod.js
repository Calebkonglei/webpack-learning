const path = require('path');
const Webpackmerge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const paths = require('./paths');

module.exports = Webpackmerge(webpackConfig, {
    mode: 'production',
    devtool:'cheap-module-source-map',
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist')
        }]),
        new ForkTsCheckerWebpackPlugin({
            typescript: require.resolve('typescript', {
                basedir: paths.appNodeModules
            }),
            tslint: false,
            async: false,
            useTypescriptIncrementalApi: true,
            checkSyntacticErrors: true,
            tsconfig: paths.appTsConfig,
            compilerOptions: {
                jsx: 'preserve',
                checkJs: false
            },
            reportFiles: ['**/*.(ts|tsx)', '!**/__tests__/**', '!**/?(*.)(spec|test).*'],
            watch: paths.appSrc,
            silent: true,
            formatter: typescriptFormatter
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial'
                }
            }
        }
    },
})