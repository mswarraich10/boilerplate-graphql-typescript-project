import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Task } from './entity/Task';
import { Tag } from './entity/Tag';
import { TaskTag } from './entity/TaskTag';
import dotenv from 'dotenv';
import { JwtToken } from './entity/JwtTokens';
import { userMigrations1665489900559 } from './migrations/1665489900559-userMigrations';
import { Newtable } from './entity/NewTable';
import { newTable1665494149825 } from './migrations/1665494149825-newTable';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5430,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, Task, Tag, TaskTag, JwtToken, Newtable],
  migrations: [userMigrations1665489900559, newTable1665494149825],
});
