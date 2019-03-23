const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    contentBase: `${__dirname}/dist`,
    compress: false,
    port: 9000,
    writeToDisk: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new HtmlWebpackHarddiskPlugin(),
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  ],
  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/,  loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.png$/,  loader: 'file-loader' },
      { test: /\.jpg$/,  loader: 'file-loader' },
      { test: /\.gif$/,  loader: 'file-loader' },
      { test: /\.svg$/,  loader: 'svg-inline-loader' }
    ]
  }
}
