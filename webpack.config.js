const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const ExportsPlugin = require('exports-library-plugin')
module.exports = {
  entry: {
    module: {
      import: './src/index.js',
      filename: 'changeme.js',
      library: {
         name: 'exports',
         type: 'assign-properties',
      }
    }
  },
  experiments: {
    outputModule: true
  },
  output: {
    clean: true
  },
  mode: process.env.NODE_ENV || 'production',
  // optimization: {
  //   usedExports: false,
  //   minimize: true
  // },
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
    }),
    new ExportsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.[cm]?js$/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.png$/,
        use: [
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.gif$/,
        use: [
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          { loader: 'svg-inline-loader' }
        ]
      }
    ]
  }
}
