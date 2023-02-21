# Typescript Sample Project (GraphQL)

## Packages

- `typeorm` @0.3.10 (with migrations)
- `type-graphql` @1.1.1
- `typedi` @0.10.0 (For Dependency Injection)
- `jsonwebtoken` @8.5.1
- `apollo-server-express` @3.11.1
- `class-validator` @0.13.2

## Important Commands

- `yarn` to install all the dependencies
- `yarn dev` to run nodemon development server
- `yarn build` to compile typescript code
- `yarn start` to run compiled code
- `TableName=<name> yarn migration:create` to create migration
- `yarn local-migration:run` to run migrations in dev
- `yarn local-migration:revert` to revert migrations in dev
- `yarn prod-migration:run` to run migrations on production
- `yarn prod-migration:revert` to revert migrations on production

### Project Structure

    .
    ├── dist                               # Compiled files
    ├── src                                # Source files
    │   ├── db                             # All Database related files
    │   │   ├── entities                   # All Database Entities
    │   │   ├── migrations
    │   │   └── index.ts                   # Database Maneger
    │   ├── errors
    │   ├── middlewares
    │   ├── modules                        # All Modules
    │   │   ├── <name>                     # Entity Name
    │   │   │   ├── <name>.resolver.ts     # All queries and Mutation related to the entity
    │   │   │   ├── service.ts             # Service class of entity
    │   │   │   └── types.ts               # Input and Object types for validation
    │   ├── types                          # custom types are defined here
    │   ├── utils                          # utility functions
    │   ├── index.ts                       # Entry point
    │   └── apolloServer.ts                # Apolloserver setup
    ├── ormconfig.ts                       # DataSource options for typeorm DataScource
    ├── .lintstagedrc.json                 # Lint Staged Options
    ├── .prettierrc.json                   # prettier Options
    ├── dist                               # Pre-Commit Hooks
    └── README.md
