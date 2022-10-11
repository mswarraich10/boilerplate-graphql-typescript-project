import { Request } from 'express';
import { User } from '../entity/User';

export interface MyContext {
  req: Request;
  user: User;
}
