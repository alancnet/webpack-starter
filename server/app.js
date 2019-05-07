const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const config = require('../config')
const expressWs = require('express-ws')
const yargs = require('yargs')

const mode = yargs.argv.mode || 'development'

const app = express()
app.server = http.createServer(app)
expressWs(app, app.server)

if (mode === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack.config')
  
  const compiler = webpack(webpackConfig)
  const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: ''
  })

  app.use((req, res, next) => {
    res.set('X-Accel-Buffering', 'no')
    next()
  })
  app.use(devMiddleware)
  app.use('/', devMiddleware)

  const hotMiddleware = webpackHotMiddleware(compiler, {
    path: '/__webpack__/__webpack_hmr'
  })
  app.use(hotMiddleware)

}

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(express.static('dist'))

app.listen = (port = config.port || (app.settings.env === 'production' ? 80 : 3000)) => new Promise((resolve, reject) => {
  app.server.once('error', (err) => {
    if (err.message.includes('EADDRINUSE') && app.settings.env === 'development' && port < 3999) {
      console.warn(err.message)
      resolve(app.listen(port + 1))
    } else {
      reject(err)
    }
  })
  app.server.listen(port, () => {
    const host = [process.env.HOSTNAME || process.env.COMPUTERNAME || 'localhost', process.env.USERDNSDOMAIN].filter(x => x).join('.').toLowerCase()
    const url = `http://${host}:${app.server.address().port}`
    console.log(`Server running at ${chalk.underline(chalk.blueBright(url))}`)
  })
})

const userApp = express.Router()

// Handle unhandled rejection in route handlers:
const appProxy = new Proxy(userApp, {
  get: (_, prop) => {
    if (prop[0] == '_') return userApp[prop]
    const orig = userApp[prop]
    if (orig instanceof Function) {
      return (...args) => {
        const newArgs = args.map(fn => {
          if (fn instanceof Function) {
            return Object.assign((...args) => {
              const ret = fn(...args)
              if (ret && ret.catch) {
                ret.catch(err => {
                  const url = args[0] && args[0].url
                  console.warn(chalk.yellow(`Unhandled Promise Rejection (${url}): ${err}`))
                  try {
                    args[1].status(500).send(err.toString())
                  } catch (err) {
                    console.warn(chalk.yellow(`Unable to send error response`))
                  }
                })
              }
              return ret
            }, fn)
          } else {
            return fn
          }
        })
        return userApp[prop](...newArgs)
      }
    } else {
      return orig
    }
  }
})

appProxy.start = () => {
  app.listen().catch(err => {
    console.log(chalk.red(err))
    process.exit(1)
  })
}

app.use(userApp)
userApp._userApp = userApp
userApp._app = app

module.exports = {
  app: appProxy
}

module.exports = app