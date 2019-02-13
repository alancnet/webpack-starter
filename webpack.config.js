const HtmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  ]
}
