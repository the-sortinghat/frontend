import bodyParser from 'body-parser'
import express from 'express'
import ModuleController from './src/controllers/module.controller'
import SystemController from './src/controllers/system.controller'

const app = express()

app.use(bodyParser.json())

app.get('/systems', SystemController.index)

app.get('/systems/:id', SystemController.find)

app.get('/modules/:id', ModuleController.find)

app.get('/services/:id', async (req, res) => {})

export default app
