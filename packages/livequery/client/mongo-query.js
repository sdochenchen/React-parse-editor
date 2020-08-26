import React from "react"
import VirtualTable from './virtual-table'

function fixDocId(docs) {
  return docs.map(doc => {
    doc.id = doc._id
    return doc
  })
}

async function invokeMongoRemote(name, method, params = {}) {
  let res = await fetch('http://localhost:3080/mongo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      method,
      params
    })
  })

  return await res.json()
}

export default class LiveQueryService {
  constructor(option = {}) {
    this.option = option
    this.list = []
    this.event = null

    this.virtTable = new VirtualTable()

    // this.query = new Parse.Query(option.service)
    this.subscription = null

    this._listIndex = new Map()
  }

  get pageSize() {
    return this.virtTable.pageSize
  }

  async initialize() {
    // this.subscription = await this.query.subscribe()
  }

  async sort(key, order, limit) {
    const numberOfRecords = Math.ceil(limit / this.pageSize) * this.pageSize
    return null
  }

  filter(list, option) {
    return []
  }

  async find(options = null) {
    const result = await invokeMongoRemote(this.option.service, 'find', {options})
    return fixDocId(result)
  }

  async get(docId) {

  }

  async create(doc) {
    const result = await invokeMongoRemote(this.option.service, 'create', {doc})
    return fixDocId(result.ops)
  }

  async update(update, filter = {}) {
    if (update.id) filter._id = update.id
    return await invokeMongoRemote(this.option.service, 'update', {filter, update})
  }

  async remove() {

  }

  bindHook(subscription) {
    const [event, setEvent] = React.useState('')

    React.useEffect(() => {
      if (subscription == null) return

      subscription.on('create', created => {
        setEvent({type: 'create', payload: created})
      })
      subscription.on('update', updated => {
        setEvent({type: 'update', payload: updated})
      })
      subscription.on('delete', removed => {
        setEvent({type: 'remove', payload: removed})
      })

      return () => {
        subscription.unsubscribe()
      }
    }, [subscription])

    return event
  }
}
