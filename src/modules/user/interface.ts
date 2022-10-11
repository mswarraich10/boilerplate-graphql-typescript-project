import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';
import {
  UserOutputType,
  UserRegisterValidation,
  UserUpdateValidation,
} from './types';

export interface IUserService {
  _getAllUsers(): Promise<User[]>;
  _getUser(email: string): Promise<User | null>;
  _createUser(data: UserRegisterValidation): Promise<User | null>;
  _deleteUser(email: string, ctx: MyContext): Promise<Boolean>;
  _updateUser(data: UserUpdateValidation, ctx: MyContext): Promise<User | null>;
  _changePassword(
    oldPass: string,
    newPass: string,
    ctx: MyContext
  ): Promise<User | null>;
  _login(email: string, password: string): Promise<UserOutputType | null>;
  _logout(ctx: MyContext): Promise<Boolean>;
  _confirmUser(token: string): Promise<boolean>;
}
