import { Tag } from '../../../db/entities/Tag'
import { Arg, Authorized, Query, Resolver } from 'type-graphql'
import { TagService } from '../service'
import { UserRole } from '../../../db/entities/User'
import { Inject, Service } from 'typedi'

@Service()
@Resolver()
export class TagGet {
  @Inject()
  private readonly tagService: TagService

  /**
   *
   * @returns Array of Tags
   */
  @Authorized([UserRole.ADMIN])
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[] | null> {
    return await this.tagService._getAllTags()
  }

  /**
   *
   * @param name
   * @returns Tag
   */
  @Authorized()
  @Query(() => Tag)
  async getTag(@Arg('name') name: string): Promise<Tag | null> {
    return await this.tagService._getTag(name)
  }
}
