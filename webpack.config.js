const Path = require('path')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const yargs = require('yargs')

const mode = yargs.argv.mode || 'development'
module.exports = {
  devtool: 'source-map',
  mode: mode,
  entry: {
    main: [
      mode === 'development' && `webpack-hot-middleware/client?path=/__webpack__/__webpack_hmr&timeout=20000`,
      Path.join(__dirname, 'app/main.js')
    ].filter(x => x)
  },
  devServer: {
    hot: mode === 'development'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.css$/,
        loader: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: ['vue-style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(ttf|woff|woff2|svg|eot)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackPwaManifest({
      name: 'CHANGEME',
      short_name: 'changeme',
      description: 'This is an installable app.',
      background_color: '#ffffff',
      icons: [
        {
          src: Path.resolve('app/assets/placeholder_icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ],
      inject: true,
      orientation: 'omit'
    }),
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, 'app/index.html'),
      inject: true,
      templateParameters: { }
    }),
    mode === 'development' && new webpack.HotModuleReplacementPlugin()
  ].filter(x => x)
}

