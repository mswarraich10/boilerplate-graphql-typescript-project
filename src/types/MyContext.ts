import { Request } from 'express';
import { User } from '../db/entities/User';

export interface MyContext {
  req: Request;
  user: User;
}
