import { config } from 'dotenv'

config({ path: './.local.env' })
config({ path: './.env' })

const port = process.env.PORT || 8000

import('./application').then(({ default: app }) => {
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`)
  })
})
