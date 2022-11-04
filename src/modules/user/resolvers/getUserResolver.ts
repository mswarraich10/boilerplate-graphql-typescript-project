import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { User, UserRole } from '../../../db/entities/User'
import { MyContext } from '../../../types/MyContext'
import { UserService } from '../service'
import { verifyJWT } from '../../../utils/jwt'
import { Inject, Service } from 'typedi'

@Service()
@Resolver()
export class UserGet {
  @Inject()
  private readonly userService: UserService

  /**
   *
   * @returns users array
   */
  @Authorized([UserRole.ADMIN])
  @Query(() => [User])
  async allUser(): Promise<User[]> {
    console.log('caledd all....')
    const users = await this.userService._getAllUsers()
    return users
  }

  /**
   *
   * @param email
   * @returns user
   */
  @Authorized([UserRole.ADMIN])
  @Query(() => User, { nullable: true })
  async getSingleUser(@Arg('email') email: string): Promise<User | null> {
    console.log('called single...')
    const user = await this.userService._getUser(email)
    return user
  }

  /**
   * mutation to get current logged in user
   * @param ctx : context
   * @returns user
   */

  @Authorized()
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: MyContext): Promise<User | null> {
    const payload: any = verifyJWT(ctx.req.session?.jwt)
    if (payload === null) return null
    return await this.userService._getUser(payload.email)
  }
}
