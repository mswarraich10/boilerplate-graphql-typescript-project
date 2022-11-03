import { MyContext } from '../../../types/MyContext'
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '../../../db/entities/User'
import { UserService } from '../service'
import { UserUpdateValidation } from '../types'
import { Inject, Service } from 'typedi'

@Service()
@Resolver()
export class UserUpdate {
  @Inject()
  private readonly userService: UserService

  /**
   * Mutation to update user
   * @param data : user data
   * @param ctx : context
   * @returns user
   */

  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg('data') data: UserUpdateValidation,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const res = await this.userService._updateUser(data, ctx)
    return res
  }
}
