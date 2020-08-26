const objectHash = require('object-hash')

// const logger = require('../logger').default

function getAndSet(cls, cache, id) {
  if (cache.has(id)) {
    return cache.get(id)
  }

  const o = cls.newInstance(cls, id)
  cache.set(id, o)
  return o
}

class SubscriptionBase {
  constructor(id) {
    this.id = id

    this.cache = new Map()
  }

  static newInstance(cls, id) {
    return new cls(id)
  }

  delete(id) {
    this.cache.delete(id)
  }

  size() {
    return this.cache.size
  }
}

class SubClient extends SubscriptionBase {
  updateSubscription(subscription) {
    this.cache.set(subscription.id, subscription)
  }
}

class SubChannel extends SubscriptionBase {
  constructor(id) {
    super(id)

    this.__clients = new Map()
  }

  get clients() {
    return this.__clients.values()
  }

  getClient(clientId) {
    return getAndSet(SubClient, this.cache, clientId)
  }

  addClient(client) {
    this.__clients.set(client.id, client)
  }

  delete(id) {
    super.delete(id)
    this.__clients.delete(id)
  }
}

class SubApp extends SubscriptionBase {
  getChannel(channel) {
    return getAndSet(SubChannel, this.cache, channel)
  }
}

class SubCache {
  static getApp(appId) {
    return getAndSet(SubApp, this.cache, appId)
  }

  static delete(appId) {
    this.cache.delete(appId)
  }

  static getSubscription(id) {
    return this.subscriptionCache.get(id)
  }

  static updateCache(appId, channel, client, subscription) {
    this.subscriptionCache.set(subscription.id, subscription)

    const app = this.getApp(appId)
    const chan = app.getChannel(channel)
    const c = chan.getClient(client.id)
    chan.addClient(client)
    c.updateSubscription(subscription)
  }
}

SubCache.cache = new Map()
SubCache.subscriptionCache = new Map()

function getId(clientId, channel, applicationId) {
  return objectHash({ clientId: clientId, channel: channel, appId: applicationId })
}

class Subscription {
  constructor(applicationId, client, query) {
    this.client = client
    this.channel = query.className
    this.appId = applicationId
    this.query = query

    this._id = getId(client.id, this.channel, this.appId)

    SubCache.updateCache(applicationId, this.channel, client, this)
  }

  get id() {
    return this._id
  }

  static getSubscription(clientId, channel, applicationId) {
    const id = getId(clientId, channel, applicationId)
    return SubCache.getSubscription(id)
  }

  static delete(id) {
    const sub = SubCache.getSubscription(id)
    const app = SubCache.getApp(sub.appId)
    const chan = app.getChannel(sub.channel)
    chan.delete(sub.clientId)

    if (chan.size === 0) {
      app.delete(chan.id)
    }

    if (app.size === 0) {
      SubCache.delete(app.id)
    }
  }

  static getApp(appId) {
    return SubApp.getApp(appId)
  }
}

module.exports = Subscription
