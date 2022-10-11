import { Arg, Mutation, Resolver } from 'type-graphql';
import { User, UserRole } from '../../../entity/User';
import { UserRegisterValidation } from '../types';
import { UserService } from '../service';
import { Inject, Service } from 'typedi';

@Service()
@Resolver()
export class UserRegister {
  @Inject()
  private readonly userService: UserService;

  /**
   * Mutation to register user
   * @param inputData
   * @returns user
   */
  @Mutation(() => User)
  async registerUser(
    @Arg('inputData') inputData: UserRegisterValidation
  ): Promise<User | null> {
    try {
      inputData.role = inputData.isAdmin ? UserRole.ADMIN : UserRole.USER;
      const user = await this.userService._createUser(inputData);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
