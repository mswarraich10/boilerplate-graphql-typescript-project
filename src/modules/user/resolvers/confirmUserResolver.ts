import { Arg, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { UserService } from '../service';

@Service()
@Resolver()
export class UserConfirm {
  @Inject()
  private readonly userService: UserService;

  /**
   *
   * @param email
   * @param password
   * @param ctx
   * @returns user
   */
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<Boolean | null> {
    try {
      const res = await this.userService._confirmUser(token);
      return res;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
