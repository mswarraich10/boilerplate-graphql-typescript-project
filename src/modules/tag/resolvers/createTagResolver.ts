import { Tag } from '../../../db/entities/Tag'
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql'
import { TagService } from '../service'
import { TagCreateValidation } from '../types'
import { Inject, Service } from 'typedi'

@Service()
@Resolver()
export class TagCreate {
  @Inject()
  private readonly taggService: TagService

  /**
   *
   * @param data
   * @returns tag
   */
  @Authorized()
  @Mutation(() => Tag)
  async createTag(@Arg('data') data: TagCreateValidation): Promise<Tag | null> {
    return await this.taggService._createTag(data)
  }
}
