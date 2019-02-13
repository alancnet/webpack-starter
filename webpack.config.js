const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

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
      },
      {
        test: /\.(ttf|woff2|woff|eot)$/,
        use: [
          { loader: 'file-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no'}
    }),
    new WebpackPwaManifest({
      name: 'CHANGEME',
      short_name: 'changeme',
      description: 'This is an installable app.',
      background_color: '#ffffff',
      icons: [
        {
          src: Path.resolve('src/assets/placeholder_icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ],
      inject: true,
      orientation: 'omit'
    }),
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  ]
}
