const webpack = require('webpack')
const path = require('path')

const BASE_PATH = path.join(__dirname, '../')
const STATIC_PATH = path.join(__dirname, '../static/')

const entry = {
    js: './src/index.js',
    vendor: [ 'react', 'redux' ]
}

const rules = [
    {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
            loader: 'file-loader',
            query: {
                name: '[name].[ext]'
            },
        },
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
            'style-loader',
            'css-loader'
        ]
    },
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            'babel-loader'
        ],
    },
]

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
]

module.exports = {
    devtool: 'eval',
    context: BASE_PATH,
    entry: entry,
    output: {
        path: STATIC_PATH,
        filename: '[name].js'
    },
    module: {
        rules: rules
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, '../node_modules'),
            STATIC_PATH
        ]
    },

    plugins,

    performance: false,

    stats: {
        colors: {
            green: '\u001b[32m'
        }
    },

    devServer: {
        contentBase: './src',
        historyApiFallback: true,
        port: 3000,
        compress: false,
        inline: true,
        hot: true,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m'
            }
        }
    }
}