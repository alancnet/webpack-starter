const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const WebSocket = require('ws')
const EventEmitter = require('events')
const chalk = require('chalk')
const config = require('../config')

const app = module.exports = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(express.static('dist'))

app.ws = new EventEmitter()
app.listen = (port = config.port || (app.settings.env === 'production' ? 80 : 3000)) => new Promise((resolve, reject) => {
  app.server = http.createServer(app)
  app.server.once('error', (err) => {
    if (err.message.includes('EADDRINUSE') && app.settings.env === 'development' && port < 3999) {
      console.warn(err.message)
      resolve(app.listen(port + 1))
    } else {
      reject(err)
    }
  })
  app.server.listen(port, () => {
    app.wss = new WebSocket.Server({ server: app.server })
    app.wss.on('connection', (...args) => app.ws.emit('connection', ...args))
    app.wss.on('message', (...args) => app.ws.emit('message', ...args))
    app.wss.on('close', (...args) => app.ws.emit('close', ...args))
    app.wss.on('error', (...args) => app.ws.emit('error', ...args))
    app.server.port = app.server.address().port
    console.log(`Server running at ${chalk.underline(chalk.blueBright(`http://localhost:${app.server.port}`))}`)
    resolve()
  })
})

module.exports = app