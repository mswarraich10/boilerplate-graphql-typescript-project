import { MyContext } from '../../../types/MyContext'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { UserService } from '../service'
import { Inject, Service } from 'typedi'

@Service()
@Resolver()
export class UserLogout {
  @Inject()
  private readonly userService: UserService

  /**
   * Mutation to logout the user.
   * @param ctx : context
   * @returns
   */
  @Authorized()
  @Query(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return await this.userService._logout(ctx)
  }
}
