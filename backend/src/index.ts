import { config } from 'dotenv'

config({ path: './.local.env' })
config({ path: './.env' })
console.log('MYSQL_CONN_STRING', process.env.MYSQL_CONN_STRING)
const port = process.env.PORT || 8000

import('./application').then(({ default: app }) => {
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`)
  })
})
