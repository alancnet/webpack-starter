import http from 'http'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import WebSocket from 'ws'
import EventEmitter from 'events'
import chalk from 'chalk'
import config from '../config.js'

const app = express()

export default app

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
