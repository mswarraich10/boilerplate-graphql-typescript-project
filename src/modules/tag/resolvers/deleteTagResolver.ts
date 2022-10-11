import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { TagService } from '../service';

@Service()
@Resolver()
export class TagDelete {
  @Inject()
  private readonly tagService: TagService;

  /**
   *
   * @param id of tag to be deleted
   * @returns True/False
   */
  @Authorized()
  @Mutation(() => Boolean)
  async deleteTag(@Arg('id') id: number): Promise<Boolean> {
    try {
      return await this.tagService._deleteTag(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
