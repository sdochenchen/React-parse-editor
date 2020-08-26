const http = require('http')
const express = require('express')
const cors = require('cors')
const LiveQueryServer = require('./LiveQuery/LiveQueryServer')

const logger = require('./logger').default

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

const server = http.createServer(app)
const lqServer = new LiveQueryServer(server, {})

app.post('/pub', function(req, res) {
  res.json(LiveQueryServer.publish(req.body) || {})
})

const host = 'http://localhost'
const port = 8080
server.listen(port, () => {
  logger.info(`server started at port ${host}:${port} ...`)
})
