import { User } from '../entity/User';
import { AuthChecker } from 'type-graphql';
import { MyContext } from '../types/MyContext';
import { verifyJWT } from '../utils/jwt';
import { JwtToken } from '../entity/JwtTokens';

/**
 *
 * Custom authorization function to check wheather user is allowed to perform a task or not.
 */
export const authChecker: AuthChecker<MyContext> = async (
  { context },
  roles
) => {
  const token = context.req.headers.authorization!.substring(7);
  if (!token) return false;

  const payload: any = verifyJWT(token);
  if (!payload) return false;

  const findUser = await User.findOne({ where: { email: payload.email } });
  if (!findUser) throw new Error('User does not exist');

  const oldToken = await JwtToken.findOne({ where: { userId: findUser.id } });
  if (oldToken?.token !== token)
    throw new Error('Session expired, login again');

  context.user = findUser;

  if (roles.length === 0) return true;

  if (roles.includes(payload.role)) return true;

  return false;
};
