import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { TaskTagService } from '../service';
import { TaskTag } from '../../../entity/TaskTag';
import { Inject, Service } from 'typedi';

@Service()
@Resolver()
export class TaskTagCreate {
  @Inject()
  private readonly taskTagService: TaskTagService;

  /**
   *
   * @param taskid
   * @param tag
   * @returns TaskTag
   */
  @Authorized()
  @Mutation(() => TaskTag)
  async createTaskTag(
    @Arg('taskid') taskid: number,
    @Arg('tag') tag: string
  ): Promise<TaskTag | null> {
    try {
      const taskTag = await this.taskTagService._createTaskTag(taskid, tag);
      return taskTag;
    } catch (e) {
      throw new Error('Something went wrong!');
    }
  }
}
