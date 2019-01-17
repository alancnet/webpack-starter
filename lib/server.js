const app = require('./app')

/* TODO: Add handlers */

const connections = []

app.ws.on('connection', ws => {
  connections.push(ws)
  ws.on('close', () => {
    connections.splice(connections.indexOf(ws), 1)
  })
  ws.on('message', message => {
    console.log(message)
    /* TODO: Add logic */
  })
  ws.send('Hello Client')
})

app.listen().catch((err) => {
  console.log(err.toString())
  process.exit(1)
})