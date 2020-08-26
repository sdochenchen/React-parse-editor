import { loadAdapter } from '../Adapters/AdapterLoader'
import { EventEmitterPubSub } from '../Adapters/PubSub/EventEmitterPubSub'

import { RedisPubSub } from '../Adapters/PubSub/RedisPubSub'

const PubSub = {}

function useRedis(config) {
  const redisURL = config.redisURL
  return typeof redisURL !== 'undefined' && redisURL !== ''
}

PubSub.createPublisher = function(config) {
  if (useRedis(config)) {
    return RedisPubSub.createPublisher(config)
  } else {
    const adapter = loadAdapter(config.pubSubAdapter, EventEmitterPubSub, config)
    if (typeof adapter.createPublisher !== 'function') {
      throw 'pubSubAdapter should have createPublisher()'
    }
    return adapter.createPublisher(config)
  }
}

PubSub.createSubscriber = function(config) {
  if (useRedis(config)) {
    return RedisPubSub.createSubscriber(config)
  } else {
    const adapter = loadAdapter(config.pubSubAdapter, EventEmitterPubSub, config)
    if (typeof adapter.createSubscriber !== 'function') {
      throw 'pubSubAdapter should have createSubscriber()'
    }
    return adapter.createSubscriber(config)
  }
}

export {
  PubSub,
}
