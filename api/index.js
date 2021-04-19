import bodyParser from 'body-parser'
import express from 'express'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello there' })
})

export default app
