/* eslint-disable n/no-path-concat */
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { authChecker } from './middlewares/authChecker'
import Container from 'typedi'

export async function getApolloServer(): Promise<any> {
  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/resolvers/*.ts'],
    validate: true,
    authChecker,
    container: Container,
  })

  return new ApolloServer({
    schema,
    context: ({ req, user }: any) => ({ req, user }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  })
}
