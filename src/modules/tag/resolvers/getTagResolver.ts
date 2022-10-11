import { Tag } from '../../../entity/Tag';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { TagService } from '../service';
import { UserRole } from '../../../entity/User';
import { Inject, Service } from 'typedi';

@Service()
@Resolver()
export class TagGet {
  @Inject()
  private readonly tagService: TagService;

  /**
   *
   * @returns Array of Tags
   */
  @Authorized([UserRole.ADMIN])
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[] | null> {
    try {
      return await this.tagService._getAllTags();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   *
   * @param name
   * @returns Tag
   */
  @Authorized()
  @Query(() => Tag)
  async getTag(@Arg('name') name: string): Promise<Tag | null> {
    try {
      return await this.tagService._getTag(name);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
