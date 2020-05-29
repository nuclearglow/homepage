const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const minimize = mode === 'production'
const plugins = []

if (mode === 'production') {
    plugins.push(
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                discardComments: true
            }
        })
    )
}

module.exports = {
    mode,
    devtool: 'source-map',
    entry: [path.resolve(__dirname, 'src/index.js')],
    output: {
        sourceMapFilename: '[file].map',
        filename: '[name].js'
    },
    optimization: {
        minimize
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
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        ...plugins
    ],
    devServer: {
        host: '0.0.0.0',
        port: 9000,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.(eot|woff|ttf|svg)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file-loader'
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
                            minimize,
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
