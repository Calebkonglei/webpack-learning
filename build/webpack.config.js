const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.argv.indexOf('--mode=production') === -1;
process.env.BABEL_ENV = devMode ? 'development' : 'production';
process.env.NODE_ENV = devMode ? 'development' : 'production';

module.exports = {
    entry: {
        main: path.resolve(__dirname,'../src/index.js')
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[hash:8].js'
    },
    module: {
        noParse: /jquery/,
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:[{
                    loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../dist/css",
                        hmr: devMode
                    }
                }, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.less$/,
                use:[devMode ? 'style-loader' : {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../dist/css",
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }, 'less-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'media/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
              },
              {
                  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                  use: [
                    {
                      loader: 'url-loader',
                      options: {
                          limit: 10240,
                          fallback: {
                              loader: 'file-loader',
                              options: {
                                  name: 'fonts/[name].[hash:8].[ext]'
                              }
                          }
                      }
                    }
                  ]
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? "[id].css" : '[id].[hash].css'
        }),
    ],
    resolve: {
        alias: {
            // 'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, 'src/assets'),
            'components': path.resolve('src/components')
        },
        extensions: ['*', '.js', '.json', '.less','css']
    },
}