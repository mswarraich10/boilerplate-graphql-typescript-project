import { User, UserRole } from '../../entity/User';
import { IUserService } from './interface';
import bcrypt from 'bcryptjs';
import { MyContext } from '../../types/MyContext';
import {
  UserOutputType,
  UserRegisterValidation,
  UserUpdateValidation,
} from './types';
import { createJWt } from '../../utils/jwt';
import { Service } from 'typedi';
import { sendMail } from '../../utils/nodemailer';
import { createUrl } from '../../utils/createUrl';
import { redis } from '../../redis';
import { JwtToken } from '../../entity/JwtTokens';

@Service()
export class UserService implements IUserService {
  /**
   *
   * @returns users array
   */
  async _getAllUsers(): Promise<User[]> {
    const users = await User.find();
    if (users.length === 0) throw new Error('No User Found');
    return users;
  }

  async _getUser(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User Not Found!');
    return user;
  }

  /**
   *
   * @param email
   * @param password
   * @param ctx :context
   * @returns user
   */
  async _login(
    email: string,
    password: string
  ): Promise<UserOutputType | null> {
    let user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Email is not registered!');
    if (!user.confirmed) throw new Error('Please confirm Email first!');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Incorrect Password!');

    const jwt = createJWt(user);
    const token = await JwtToken.findOne({ where: { userId: user.id } });
    console.log('toke....', token);
    token
      ? await JwtToken.update({ userId: user.id }, { token: jwt })
      : await JwtToken.create({ token: jwt, user: user }).save();
    return { user, jwt };
  }

  /**
   *
   * @param data : email, firstname, lastname and password
   * @returns user
   */

  async _createUser(data: UserRegisterValidation): Promise<User | null> {
    const { firstName, lastName, email, password, role } = data;
    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) throw new Error('Email Already Exist!');

    const hashPassword: string = await bcrypt.hash(password, 14);

    let user = User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });

    await sendMail(email, await createUrl(user.id));

    user = await user.save();

    if (!user) throw new Error('something went wrong!');
    return user;
  }

  /**
   *
   * @param token
   * @returns true/false
   */
  async _confirmUser(token: string): Promise<boolean> {
    const userId = await redis.get(token);
    console.log('here is uSer Id......', userId);
    if (!userId) throw new Error('Token is invalid');

    const user = await User.update(
      { id: parseInt(userId) },
      { confirmed: true }
    );
    if (user.affected && user.affected > 0) {
      await redis.del(token);
      return true;
    }
    throw new Error('Something went wrong while updating!');
  }

  /**
   * Deletes user
   * @param email
   * @returns
   */
  async _deleteUser(email: string, ctx: MyContext): Promise<Boolean> {
    if (ctx.user.role !== UserRole.ADMIN && ctx.user.email !== email)
      throw new Error('You can not perform this action');
    const res = await User.delete({ email });
    if (res.affected && res.affected >= 0) return true;
    return false;
  }

  /**
   *
   * @param data : user data
   * @param ctx : context
   * @returns user
   */
  async _updateUser(data: UserUpdateValidation, ctx: MyContext): Promise<User> {
    const user = await User.findOne({ where: { email: ctx.user.email } });
    user!.firstName = data.firstName ?? user!.firstName;
    user!.lastName = data.lastName ?? user!.lastName;
    user!.email = data.email ?? user!.email;

    return await user!.save();
  }

  /**
   * updates password
   * @param oldPass
   * @param newPass
   * @param ctx : context
   * @returns user
   */
  async _changePassword(
    oldPass: string,
    newPass: string,
    ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email: ctx.user.email } });
    const valid = await bcrypt.compare(user!.password, oldPass);
    if (!valid) throw new Error('Wrong Password');

    user!.password = await bcrypt.hash(newPass, 12);
    return user!.save();
  }

  /**
   *
   * @param ctx : context
   * @returns
   */
  async _logout(ctx: MyContext): Promise<Boolean> {
    try {
      await JwtToken.delete({ userId: ctx.user.id });
      return true;
    } catch (e) {
      return false;
    }
  }
}
