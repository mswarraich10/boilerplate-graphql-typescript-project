import 'reflect-metadata';
import express, { Express } from 'express';
import { dataSource } from './dataSource';

import { getApolloServer } from './apolloServer';

const main = async () => {
  dataSource
    .initialize()
    .then(() => console.log('Database connected'))
    .catch(() => console.log('Something went wrong while connecting database'));

  const app: Express = express();
  const apolloServer = await getApolloServer();

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log('Listening at port 4000'));
};

main();
