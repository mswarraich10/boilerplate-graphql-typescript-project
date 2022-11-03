import { Arg, Mutation, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { UserService } from '../service'
import { UserLoginType, UserOutputType } from '../types'

@Service()
@Resolver()
export class UserLogin {
  @Inject()
  private readonly userService: UserService

  /**
   *
   * @param email
   * @param password
   * @returns user
   */
  @Mutation(() => UserOutputType)
  async login(
    @Arg('data') data: UserLoginType
  ): Promise<UserOutputType | null> {
    const res = await this.userService._login(data.email, data.password)
    return res
  }
}
