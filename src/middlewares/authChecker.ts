import { User } from '../db/entities/User'
import { AuthChecker } from 'type-graphql'
import { MyContext } from '../types/MyContext'
import { verifyJWT } from '../utils/jwt'
import { JwtToken } from '../db/entities/JwtTokens'
import { Messages } from '../errors'
import { HTTP401Error } from '../errors/http401.error'

/**
 *
 * Custom authorization function to check wheather user is allowed to perform a task or not.
 */
export const authChecker: AuthChecker<MyContext> = async (
  { context },
  roles
) => {
  const token = context.req.headers.authorization?.substring(7)
  if (token == null) return false

  const payload: any = verifyJWT(token)
  if (payload === null) return false

  const findUser = await User.findOne({ where: { email: payload.email } })
  if (findUser == null) return false

  const oldToken = await JwtToken.findOne({ where: { userId: findUser.id } })
  if (oldToken?.token !== token)
    throw new HTTP401Error(Messages.INVALID_AUTHORIZATION_TOKEN)

  context.user = findUser

  if (roles.length === 0) return true

  if (roles.includes(payload.role)) return true

  return false
}
