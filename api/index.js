import bodyParser from 'body-parser'
import express from 'express'
import SystemController from './src/controllers/system.controller'

const app = express()

app.use(bodyParser.json())

app.get('/systems', SystemController.index)

app.get('/systems/:id', SystemController.find)

app.get('/modules/:id', async (req, res) => {})

app.get('/services/:id', async (req, res) => {})

export default app
