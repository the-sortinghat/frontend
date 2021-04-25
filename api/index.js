import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import ModuleController from './src/controllers/module.controller'
import ServiceController from './src/controllers/service.controller'
import SystemController from './src/controllers/system.controller'

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.get('/systems', SystemController.index)

app.get('/systems/:id', SystemController.find)

app.get('/systems/:id/modules', SystemController.getModules)

app.get('/systems/:id/metrics', SystemController.getMetrics)

app.get('/modules/:id', ModuleController.find)

app.get('/services/:id', ServiceController.find)

export default app
