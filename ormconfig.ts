/* eslint-disable n/no-path-concat */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import dotenv from 'dotenv';
dotenv.config();

const rootDir = __dirname + '/src/db';
const defaultConfig = {
  host: 'localhost',
  port: 5430,
  // url: process.env.DATABASE_URL,
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,
  database: process.env.DATABASE!,
  synchronize: false,
  logging: !(
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
  ),
  entities: [rootDir + '/entities/*.{js,ts}'],
  migrations: [rootDir + '/migrations/*.{js,ts}'],
  migrationsTableName: 'migration',
  // seeds: [rootDir + '/seeds/*.{js,ts}'],
  // factories: [rootDir + '/seeds/factories/**/*.{js,ts}'],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    entitiesDir: [__dirname + './src/db/entities/'],
    migrationsDir: [__dirname + './src/db/migrations/'],
  },
};

export default defaultConfig;
