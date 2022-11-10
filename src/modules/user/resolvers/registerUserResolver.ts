import { Arg, Mutation, Resolver } from 'type-graphql';
import { User, UserRole } from '../../../db/entities/User';
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
    inputData.role =
      inputData.isAdmin ?? false ? UserRole.ADMIN : UserRole.USER;
    const user = await this.userService._createUser(inputData);
    return user;
  }
}
