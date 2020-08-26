import Parse from 'parse/node'
import LRU from 'lru-cache'

const logger = require('../logger')

function userForSessionToken(sessionToken) {
  var q = new Parse.Query('_Session')
  q.equalTo('sessionToken', sessionToken)
  return q.first({ useMasterKey: true }).then(function(session) {
    if (!session) {
      return Parse.Promise.error('No session found for session token')
    }
    return session.get('user')
  })
}

class SessionTokenCache {
  constructor(timeout = 30 * 24 * 60 * 60 * 1000, maxSize = 10000) {
    this.cache = new LRU({
      max: maxSize,
      maxAge: timeout,
    })
  }

  getUserId(sessionToken) {
    if (!sessionToken) {
      return Parse.Promise.error('Empty sessionToken')
    }
    const userId = this.cache.get(sessionToken)
    if (userId) {
      logger.verbose('Fetch userId %s of sessionToken %s from Cache', userId, sessionToken)
      return Parse.Promise.as(userId)
    }
    return userForSessionToken(sessionToken).then((user) => {
      logger.verbose('Fetch userId %s of sessionToken %s from Parse', user.id, sessionToken)
      const userId = user.id
      this.cache.set(sessionToken, userId)
      return Parse.Promise.as(userId)
    }, (error) => {
      logger.error('Can not fetch userId for sessionToken %j, error %j', sessionToken, error)
      return Parse.Promise.error(error)
    })
  }
}

export {
  SessionTokenCache,
}
