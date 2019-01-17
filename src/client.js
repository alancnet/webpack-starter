const client = new EventTarget()
const delay = 1000
const protocol = `ws${location.protocol.substr(4)}`
const path = location.pathname.split('/').slice(0, -1).join('/')
const url = `${protocol}//${location.host}${path}`

let _connect = null

const connect = () => {
  if (_connect == null) {
    _connect = new Promise(resolve => {
      const ws = new WebSocket(url)
      window.ws = ws
      let connected = false
      const retry = () => resolve(new Promise(resolve => setTimeout(resolve, delay)).then(connect))
      const dispatch = evt => client.dispatchEvent(new evt.constructor(evt.type, evt))
      ws.addEventListener('open', evt => {
        connected = true
        dispatch(evt)
        resolve(ws)
      })
      ws.addEventListener('close', evt => {
        _connect = null
        dispatch(evt)
        retry()
      })
      ws.addEventListener('message', evt => dispatch(evt))
      ws.addEventListener('error', evt => {
        if (!connected) retry()
        dispatch(evt)
      })
    })
  }
  return _connect
}

const send = message => connect().then(ws => ws.send(message))

client.connect = connect
client.send = send
module.exports = client