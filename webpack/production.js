const webpack = require('webpack')
const path = require('path')

const BASE_PATH = path.join(__dirname, '../')
const STATIC_PATH = path.join(__dirname, '../static/')

const entry = {
  'index.js': './src/index.js',
  'vendor.js': [ 'react', 'redux' ]
}

const rules = [
  {
    test: /\.html$/,
    exclude: /node_modules/,
    use: {
      loader: 'file-loader',
      query: {
        name: '[name]'
      }
    }
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
    ]
  }
]

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.js'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    },
    output: {
      comments: false
    }
  })
]

module.exports = {
  devtool: 'source-map',
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
    extensions: [ '.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx' ],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      BASE_PATH
    ]
  },

  plugins,

  performance: {
    maxAssetSize: 100,
    maxEntrypointSize: 300,
    hints: 'warning'
  },

  stats: {
    colors: {
      green: '\u001b[32m'
    }
  },

  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    port: 3000,
    compress: true,
    inline: false,
    hot: false,
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
