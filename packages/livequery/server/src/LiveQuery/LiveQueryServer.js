const tv4 = require('tv4')
const Subscription = require('./Subscription')
const { Client } = require('./Client')
const { WebSocketServer } = require('./WebSocketServer')
const RequestSchema = require('./RequestSchema')
const uuid = require('uuid/v4')
const Publisher = require('./Publisher')

const logger = require('../logger').default


class LiveQueryServer {
  constructor(server, config = { websocketTimeout: null }) {
    // Initialize websocket server
    WebSocketServer.newInstance(
      server,
      (ws) => this._onConnect(ws),
      config.websocketTimeout,
    )

    this.clients = new Map()

    // Initialize sessionToken cache
    // this.sessionTokenCache = new SessionTokenCache(config.cacheTimeout)
  }

  static publish(message) {
    logger.verbose(`publish message: \n\t${message}\n`)
    Publisher.publish(message)
  }

  _onConnect(ws) {
    ws.on('message', this._onMessage.bind(this, ws))
    ws.on('disconnect', this._onDisconnect.bind(this, ws))
  }

  _onMessage(ws, request) {
    if (typeof request === 'string') {
      try {
        request = JSON.parse(request)
      } catch (e) {
        logger.error(`unable to parse request (${request}), ${e}`)
        return
      }
    }
    logger.verbose(`Request: ${request}`)

    // Check whether this request is a valid request, return error directly if not
    if (!tv4.validate(request, RequestSchema['general']) || !tv4.validate(request, RequestSchema[request.op])) {
      Client.pushError(ws, 1, tv4.error.message)
      logger.error(`Connect message error ${tv4.error.message}`)
      return
    }

    switch (request.op) {
      case 'connect':
        this._handleConnect(ws, request)
        break
      case 'subscribe':
        this._handleSubscribe(ws, request)
        break
      case 'unsubscribe':
        this._handleUnsubscribe(ws, request)
        break
      default:
        Client.pushError(ws, 3, 'Get unknown operation')
        logger.error(`Get unknown operation ${request.op}`)
    }
  }

  _onDisconnect(ws) {
    logger.info(`Client disconnect: ${ws.clientId}`)
    const clientId = ws.clientId
    if (!this.clients.has(clientId)) {
      logger.error(`Can not find client ${clientId} on disconnect`)
      return
    }

    // Delete client
    const client = this.clients.get(clientId)
    this.clients.delete(clientId)

    // Delete client from subscriptions
    for (let subId of client.subscriptions) {
      Subscription.delete(subId)
    }

    logger.verbose(`Current clients ${this.clients.size}`)
  }

  _handleConnect(ws, request) {
    const { sessionToken, applicationId } = request
    const clientId = uuid()
    const client = new Client(clientId, ws, sessionToken, applicationId)

    ws.clientId = client.id
    this.clients.set(ws.clientId, client)

    logger.info(`Create new client: ${ws.clientId}`)

    client.pushConnect()
  }

  _handleSubscribe(ws, request) {
    // If we can not find this client, return error to client
    if (!ws.hasOwnProperty('clientId')) {
      Client.pushError(ws, 2, 'Can not find this client, make sure you connect to server before subscribing')
      logger.error('Can not find this client, make sure you connect to server before subscribing')
      return
    }
    const client = this.clients.get(ws.clientId)
    const { requestId, query, sessionToken } = request
    const subscription = new Subscription(client.app, client, query)

    client.addSubscription(subscription.id)

    client.pushSubscribe(requestId, subscription.id)

    logger.verbose(`Create client ${ws.clientId} new subscription: ${subscription.id}`)
    logger.verbose(`Current client number: ${this.clients.size}`)
  }

  _handleUnsubscribe(ws, request) {
    // If we can not find this client, return error to client
    if (!ws.hasOwnProperty('clientId')) {
      Client.pushError(ws, 2, 'Can not find this client, make sure you connect to server before unsubscribing')
      logger.error('Can not find this client, make sure you connect to server before unsubscribing')
      return
    }
    const { subscriptionId } = request
    const client = this.clients.get(ws.clientId)
    if (typeof client === 'undefined') {
      Client.pushError(ws, 2, 'Cannot find client with clientId ' + ws.clientId +
        '. Make sure you connect to live query server before unsubscribing.')
      logger.error('Can not find this client ' + ws.clientId)
      return
    }

    client.removeSubscription(subscriptionId)
    Subscription.delete(subscriptionId)

    client.pushUnsubscribe(request.requestId)

    logger.verbose(`Delete client: ${ws.clientId} | subscription: ${request.requestId}`)
  }
}

module.exports = LiveQueryServer
