const http = require('http')
const express = require('express')
const expressLogging = require('express-logging')
const config = require('../config')

const app = module.exports = express()

app.use(expressLogging(console))
app.use(express.static('dist'))

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
    console.log(`Listening on http://localhost:${app.server.address().port}`)
  })
})

module.exports = app