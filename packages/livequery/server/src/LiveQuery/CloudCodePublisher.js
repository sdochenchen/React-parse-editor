import { PubSub } from './PubSub'
import Parse from 'parse/node'
import logger from '../logger'

class CloudCodePublisher {
  parsePublisher

  // config object of the publisher, right now it only contains the redisURL,
  // but we may extend it later.
  constructor(config) {
    this.parsePublisher = PubSub.createPublisher(config)
  }

  onCloudCodeAfterSave(request) {
    this._onCloudCodeMessage(Parse.applicationId + 'afterSave', request)
  }

  onCloudCodeAfterDelete(request) {
    this._onCloudCodeMessage(Parse.applicationId + 'afterDelete', request)
  }

  // Request is the request object from cloud code functions. request.object is a ParseObject.
  _onCloudCodeMessage(type, request) {
    logger.verbose('Raw request from cloud code current : %j | original : %j', request.object, request.original)
    // We need the full JSON which includes className
    const message = {
      currentParseObject: request.object._toFullJSON(),
    }
    if (request.original) {
      message.originalParseObject = request.original._toFullJSON()
    }
    this.parsePublisher.publish(type, JSON.stringify(message))
  }
}

export {
  CloudCodePublisher,
}