const logger = require('../logger').default
const { Server } = require('ws')

const typeMap = new Map([['disconnect', 'close']])

class WebSocketServer {
  constructor(server, onConnect, websocketTimeout = 30 * 1000) {

    const wss = new Server({ server: server })
    wss.on('listening', () => {
      logger.info('LiveQuery Server starts running')
    })
    wss.on('connection', (ws) => {
      onConnect(new WebSocket(ws))
      // Send ping to client periodically
      const pingIntervalId = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          ws.ping()
        } else {
          clearInterval(pingIntervalId)
        }
      }, websocketTimeout)
    })
    // this.server = wss
  }

  static newInstance(server, onConnect, timeout) {
    return new WebSocketServer(server, onConnect, timeout)
  }
}

class WebSocket {
  constructor(ws) {
    this.ws = ws
  }

  on(type, callback) {
    const wsType = typeMap.has(type) ? typeMap.get(type) : type
    this.ws.on(wsType, callback)
  }

  send(message) {
    this.ws.send(message)
  }
}

module.exports = {
  WebSocketServer,
}
