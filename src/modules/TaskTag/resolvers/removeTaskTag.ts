import { Arg, Authorized, Mutation, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { TaskTagService } from '../service'

@Service()
@Resolver()
export class TaskTagRemove {
  @Inject()
  private readonly taskTagService: TaskTagService

  /**
   *
   * @param task
   * @param tag
   * @returns True/False
   */
  @Authorized()
  @Mutation(() => Boolean)
  async removeTaskTag(
    @Arg('task') task: number,
    @Arg('tag') tag: number
  ): Promise<boolean> {
    const taskTag = await this.taskTagService._removeTag(task, tag)
    return taskTag
  }
}
