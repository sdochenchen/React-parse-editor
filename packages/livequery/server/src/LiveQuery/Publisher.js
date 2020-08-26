const Subscription = require('./Subscription')

class Publisher {
  static publish(message) {
    const { channel, op, instance, applicationId, sessionToken } = message
    const app = Subscription.getApp(applicationId)
    const chan = app.getChannel(channel)
    const clients = chan.clients

    clients.forEach(client => {
      const sub = Subscription.getSubscription(client.id, channel, applicationId)

      if (sub.channel === channel) {
        client.publish(op, sub.id, instance)
      }
    })
  }
}

module.exports = Publisher
