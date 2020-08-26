const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'docE'

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let db = null


function connect() {
  return new Promise((resolve, reject) => {
    // Use connect method to connect to the Server
    client.connect(function (err) {
      if (err) throw err

      console.log("Connected successfully to server")

      db = client.db(dbName)
      resolve(db)

      // client.close()
    })
  })
}

connect()

module.exports = function (options) {
  return async (req, res, next) => {
    if (!db) await connect()
    const {name, method, params} = req.body
    const collection = db.collection(name)
    const data = await invokeHandler(collection, method, params)
    res.json(data)
  }
}

async function invokeHandler(collection, method, params) {
  switch(method) {
    case 'find':
      return await invokeFind(collection, params)
    case 'create':
      return await invokeCreate(collection, params)
    case 'update':
      return await invokeUpdate(collection, params)
  }
}

async function invokeFind(collection, {options = {}}) {
  const cursor = collection.find({})
  const {$skip, $limit, $sort, $filter} = options
  if ($skip) cursor.skip($skip)
  if ($limit) cursor.limit($limit)
  if ($sort) cursor.sort($sort)
  if ($filter) cursor.filter($filter)
  return await cursor.toArray()
}

async function invokeCreate(collection, {doc}) {
  if (Array.isArray(doc)) {
    return await collection.insertMany(doc)
  } else {
    return await collection.insertOne(doc)
  }
}

async function invokeUpdate(collection, {filter, update}) {
  return await collection.updateMany(filter, {$set: update})
}
