import { Task } from '../../../entity/Task';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { TaskService } from '../service';
import { MyContext } from '../../../types/MyContext';
import { TaskUpdateValidation } from '../types';
import { Inject, Service } from 'typedi';

@Service()
@Resolver()
export class TaskUpdate {
  @Inject()
  private readonly taskService: TaskService;

  /**
   *
   * @param data
   * @param ctx : context
   * @returns task
   */
  @Authorized()
  @Mutation(() => Task)
  async updateTask(
    @Arg('data') data: TaskUpdateValidation,
    @Ctx() ctx: MyContext
  ): Promise<Task> {
    try {
      return await this.taskService._updateTask(data, ctx);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
