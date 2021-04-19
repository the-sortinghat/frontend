const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello there' })
})

module.exports = app
