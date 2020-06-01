const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: [path.resolve(__dirname, 'src/index.js')],
    output: {
        sourceMapFilename: '[file].map',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat'
            // Must be below test-utils
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/rtype.png',
            cache: true,
            inject: true,
            favicons: {
                appName: 'svenvowe.de',
                appDescription: 'Hello',
                developerName: 'Sven Vowe',
                background: '#1e1e1e',
                theme_color: '#1e1e1e',
                appleStatusBarStyle: 'black-translucent',
                orientation: 'portrait',
                pixel_art: true,
                icons: {
                    favicons: true,
                    android: true,
                    appleIcon: true,
                    yandex: true,
                    coast: true,
                    firefox: false,
                    appleStartup: false,
                    windows: false
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            /* eslint-disable-next-line global-require */
                            plugins: [require('autoprefixer')()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
