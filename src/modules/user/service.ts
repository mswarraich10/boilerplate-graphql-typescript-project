import { User, UserRole } from '../../db/entities/User'
import { IUserService } from './interface'
import bcrypt from 'bcryptjs'
import { MyContext } from '../../types/MyContext'
import {
  UserOutputType,
  UserRegisterValidation,
  UserUpdateValidation,
} from './types'
import { createJWt } from '../../utils/jwt'
import { Service } from 'typedi'
import { sendMail } from '../../utils/nodemailer'
import { createUrl } from '../../utils/createUrl'
import { redis } from '../../redis'
import { JwtToken } from '../../db/entities/JwtTokens'
import {
  HTTP400Error,
  HTTP404Error,
  HTTP500Error,
  HTTP403Error,
  Messages,
} from '../../errors'

@Service()
export class UserService implements IUserService {
  /**
   *
   * @returns users array
   */
  async _getAllUsers(): Promise<User[]> {
    const users = await User.find()
    if (users.length === 0) throw new HTTP404Error(Messages.UNABLE_TO_GET_USERS)
    return users
  }

  async _getUser(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } })
    if (user === null) throw new HTTP404Error(Messages.USER_NOT_FOUND)
    return user
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
    const user = await User.findOne({ where: { email } })
    if (user == null) throw new HTTP400Error(Messages.INVALID_EMAIL)
    if (!user.confirmed) throw new HTTP400Error(Messages.USER_NOT_CONFIRMED)
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new HTTP400Error(Messages.INVALID_PASS)

    const jwt = createJWt(user)
    const token = await JwtToken.findOne({ where: { userId: user.id } })
    token != null
      ? await JwtToken.update({ userId: user.id }, { token: jwt })
      : await JwtToken.create({ token: jwt, user }).save()
    return { user, jwt }
  }

  /**
   *
   * @param data : email, firstname, lastname and password
   * @returns user
   */

  async _createUser(data: UserRegisterValidation): Promise<User | null> {
    const { firstName, lastName, email, password, role } = data
    const checkUser = await User.findOne({ where: { email } })
    if (checkUser != null) throw new HTTP400Error(Messages.ALREADY_REGISTERD)

    const hashPassword: string = await bcrypt.hash(password, 14)

    let user = User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    })

    await sendMail(email, await createUrl(user.id))

    user = await user.save()

    if (user === null) throw new HTTP500Error(Messages.UNABLE_TO_CREATE_USER)
    return user
  }

  /**
   *
   * @param token
   * @returns true/false
   */
  async _confirmUser(token: string): Promise<boolean> {
    const userId = await redis.get(token)
    if (userId === null)
      throw new HTTP400Error(Messages.INVALID_CONFIRMATION_TOKEN)

    const user = await User.update(
      { id: parseInt(userId) },
      { confirmed: true }
    )
    if (user.affected != null && user.affected > 0) {
      await redis.del(token)
      return true
    }
    throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
  }

  /**
   * Deletes user
   * @param email
   * @returns
   */
  async _deleteUser(email: string, ctx: MyContext): Promise<Boolean> {
    try {
      if (ctx.user.role !== UserRole.ADMIN && ctx.user.email !== email)
        throw new HTTP403Error(Messages.UNAUTORIZED_OPERATION)
      const res = await User.delete({ email })
      if (res.affected != null && res.affected >= 0) return true
      return false
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }

  /**
   *
   * @param data : user data
   * @param ctx : context
   * @returns user
   */
  async _updateUser(data: UserUpdateValidation, ctx: MyContext): Promise<User> {
    const user = await User.findOne({ where: { email: ctx.user.email } })
    if (user == null) throw new HTTP400Error(Messages.INVALID_EMAIL)
    user.firstName = data.firstName ?? user.firstName
    user.lastName = data.lastName ?? user.lastName
    user.email = data.email ?? user.email
    try {
      return await user.save()
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
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
    const user = await User.findOne({ where: { email: ctx.user.email } })
    if (user == null) throw new HTTP400Error(Messages.INVALID_EMAIL)
    const valid = await bcrypt.compare(user.password, oldPass)
    if (!valid) throw new HTTP400Error(Messages.PASSWORD_DOES_NOT_MATCH)

    user.password = await bcrypt.hash(newPass, 12)
    try {
      return await user.save()
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }

  /**
   *
   * @param ctx : context
   * @returns
   */
  async _logout(ctx: MyContext): Promise<Boolean> {
    try {
      await JwtToken.delete({ userId: ctx.user.id })
      return true
    } catch (e) {
      return false
    }
  }
}
