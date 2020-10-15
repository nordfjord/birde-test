import express from 'express'
import { dataController } from './controllers/data'
import { pingController } from './controllers/ping'
import cors from 'cors'

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(pingController)
app.use(dataController)

export default app
