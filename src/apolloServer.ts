import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserRegister } from './modules/user/resolvers/registerUserResolver';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { authChecker } from './middleware/authChecker';
import { UserLogin } from './modules/user/resolvers/loginUserResolver';
import { UserDelete } from './modules/user/resolvers/deleteUserResolver';
import { UserGet } from './modules/user/resolvers/getUserResolver';
import { TaskGet } from './modules/task/resolvers/getTaskResolver';
import { TaskCreate } from './modules/task/resolvers/createTaskResolver';
import { TaskDelete } from './modules/task/resolvers/deleteTaskResolver';
import { UserLogout } from './modules/user/resolvers/logoutUserResolver';
import { TaskUpdate } from './modules/task/resolvers/updateTaskResolver';
import { UserUpdate } from './modules/user/resolvers/updateUserResolver';
import { TaskTagCreate } from './modules/TaskTag/resolvers/createTaskTag';
import { TaskTagRemove } from './modules/TaskTag/resolvers/removeTaskTag';
import { TagCreate } from './modules/tag/resolvers/createTagResolver';
import { TagDelete } from './modules/tag/resolvers/deleteTagResolver';
import { TagUpdate } from './modules/tag/resolvers/updateTagResolver';
import { TagGet } from './modules/tag/resolvers/getTagResolver';
import Container from 'typedi';
import { UserConfirm } from './modules/user/resolvers/confirmUserResolver';

export async function getApolloServer() {
  const schema = await buildSchema({
    resolvers: [
      UserLogin,
      UserDelete,
      UserGet,
      UserRegister,
      UserConfirm,
      UserLogout,
      UserUpdate,
      TaskCreate,
      TaskDelete,
      TaskGet,
      TaskUpdate,
      TaskTagCreate,
      TaskTagRemove,
      TagCreate,
      TagDelete,
      TagUpdate,
      TagGet,
    ],
    validate: false,
    authChecker,
    container: Container,
  });

  return new ApolloServer({
    schema,
    context: ({ req, user }: any) => ({ req, user }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });
}
