const express = require('express');
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')

const mongo = require('./mongo')

const app = express()

app.use(cors())
app.use(compression())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/mongo', mongo())

app.listen(3080, function () {
  console.log('CORS-enabled web server listening on port 3080')
})
