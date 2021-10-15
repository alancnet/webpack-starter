const delay = 1000
const protocol = `ws${location.protocol.substr(4)}`
const path = location.pathname.split('/').slice(0, -1).join('/')
const url = `${protocol}//${location.host}${path}`

export default class Client extends EventTarget {
  constructor() {
    super()
    this._connect = null
  }

  async connect () {
    if (this._connect == null) {
      this._connect = new Promise(resolve => {
        const ws = new WebSocket(url)
        window.ws = ws
        let connected = false
        const retry = () => resolve(new Promise(resolve => setTimeout(resolve, delay)).then(() => this.connect()))
        const dispatch = evt => this.dispatchEvent(new evt.constructor(evt.type, evt))
        ws.addEventListener('open', evt => {
          connected = true
          dispatch(evt)
          resolve(ws)
        })
        ws.addEventListener('close', evt => {
          this._connect = null
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
    return await this._connect
  }

  async send (message) {
    const ws = await this.connect()
    ws.send(message)
  }
}

export const client = new Client()
