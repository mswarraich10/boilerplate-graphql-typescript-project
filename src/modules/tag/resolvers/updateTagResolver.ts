import { Tag } from '../../../db/entities/Tag'
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql'
import { TagService } from '../service'
import { TagCreateValidation } from '../types'
import { Inject, Service } from 'typedi'

@Service()
@Resolver()
export class TagUpdate {
  @Inject()
  private readonly tagService: TagService

  /**
   *
   * @param id
   * @param data
   * @returns Tag
   */
  @Authorized()
  @Mutation(() => Tag)
  async updateTag(
    @Arg('id') id: number,
    @Arg('data') data: TagCreateValidation
  ): Promise<Tag | null> {
    return await this.tagService._updateTag(id, data)
  }
}
