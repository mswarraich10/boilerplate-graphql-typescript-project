import { MyContext } from 'src/types/MyContext';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { UserService } from '../service';

@Service()
@Resolver()
export class UserDelete {
  @Inject()
  private readonly userService: UserService;

  /**
   *
   * @param email
   * @returns
   */
  @Authorized()
  @Mutation(() => Boolean)
  async deleteUser(
    @Arg('email') email: string,
    @Ctx() ctx: MyContext
  ): Promise<Boolean> {
    const res = await this.userService._deleteUser(email, ctx);
    return res;
  }
}
