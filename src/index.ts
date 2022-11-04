import 'reflect-metadata'
import express, { Express } from 'express'
import manager from './db'
import dotenv from 'dotenv'

import { getApolloServer } from './apolloServer'
dotenv.config()

const main = async (): Promise<void> => {
  const port = process.env.PORT ?? 4000
  await manager.init()

  const app: Express = express()

  const apolloServer = await getApolloServer()
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.listen(port, () => console.log(`Listening at port ${port}`))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()

export default manager.datasource
