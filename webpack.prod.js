const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        sideEffects: true,
        moduleIds: 'hashed',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                discardComments: true
            }
        })
    ],
    stats: 'minimal'
})
