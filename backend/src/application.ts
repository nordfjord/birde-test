import express from 'express'
import { dataController } from './controllers/data'
import { pingController } from './controllers/ping'
import cors from 'cors'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:3000' }))
}

const apiRouter = express.Router()

apiRouter.use(pingController)
apiRouter.use(dataController)

app.use('/api', apiRouter)
app.use(express.static('./frontend'))

export default app
