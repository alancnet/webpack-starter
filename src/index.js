require('./index.css')
const client = require('./client')
document.addEventListener('DOMContentLoaded', () => {
  client.connect()
  client.addEventListener('open', () => {
    client.send('Hello Server')
  })
  client.addEventListener('message', evt => {
    console.log(evt.data)
  })
})