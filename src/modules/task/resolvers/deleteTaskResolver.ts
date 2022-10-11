import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { TaskService } from '../service';

@Service()
@Resolver()
export class TaskDelete {
  @Inject()
  private readonly taskService: TaskService;

  /**
   *
   * @param id of task to delete
   * @returns true/false
   */
  @Authorized()
  @Mutation(() => Boolean)
  async deleteTask(@Arg('id') id: number): Promise<Boolean> {
    try {
      return await this.taskService._deleteTask(id);
    } catch (e) {
      throw new Error('Something went wrong!');
    }
  }
}
