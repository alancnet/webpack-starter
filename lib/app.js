const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const config = require('../config')

const app = module.exports = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
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
    console.log(`Server running at ${chalk.underline(chalk.blueBright(`http://localhost:${app.server.address().port}`))}`)
  })
})

module.exports = app