const logger = require('../logger').default

const dafaultFields = ['className', 'objectId', 'updatedAt', 'createdAt', 'ACL']

class Client {
  constructor(id, socket, sessionToken, appId) {
    this.id = id
    this.appId = appId
    this.socket = socket
    this.session = sessionToken
    this.roles = []
    this.subscriptions = new Set()

    // this.pushConnect = this._pushEvent('connected')
    // this.pushSubscribe = this._pushEvent('subscribed')
    // this.pushUnsubscribe = this._pushEvent('unsubscribed')

    // this.pushCreate = this._pushEvent('create')
    // this.pushUpdate = this._pushEvent('update')
    // this.pushDelete = this._pushEvent('delete')
    //
    // this.pushEnter = this._pushEvent('enter')
    // this.pushLeave = this._pushEvent('leave')
  }

  get app() {
    return this.appId
  }

  static pushResponse(socket, message) {
    logger.verbose(`Push Response : ${message}`)
    socket.send(JSON.stringify(message))
  }

  static pushError(socket, code, error, reconnect = true) {
    Client.pushResponse(socket, {
      'op': 'error',
      'error': error,
      'code': code,
      'reconnect': reconnect,
    })
  }

  addSubscription(subId) {
    this.subscriptions.add(subId)
  }

  removeSubscription(subId) {
    this.subscriptions.delete(subId)
  }

  _pushEvent(type) {
    return function(subscriptionId) {
      const response = {
        'op': type,
        'clientId': this.id,
        'subscriptionId': subscriptionId,
      }
      Client.pushResponse(this.socket, response)
    }
  }

  pushConnect() {
    Client.pushResponse(this.socket, {
      op: 'connected',
      clientId: this.id,
    })
  }

  pushSubscribe(requestId, subscriptionId) {
    Client.pushResponse(this.socket, {
      op: 'subscribed',
      clientId: this.id,
      requestId,
      subscriptionId,
    })
  }

  pushUnsubscribe(requestId) {
    Client.pushResponse(this.socket, {
      op: 'unsubscribed',
      clientId: this.id,
      requestId,
    })
  }

  publish(type, subscriptionId, data) {
    Client.pushResponse(this.socket, {
      'op': type,
      'clientId': this.id,
      subscriptionId,
      data,
    })
  }
}

module.exports = {
  Client,
}
