import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../../types/MyContext';
import { Task } from '../../../entity/Task';
import { TaskCreateValidation } from '../types';
import { TaskService } from '../service';
import { Inject, Service } from 'typedi';

@Service()
@Resolver()
export class TaskCreate {
  @Inject()
  private readonly taskService: TaskService;

  /**
   *
   * @param inputData contains name,description of task
   * @param ctx context
   * @returns task
   */
  @Authorized()
  @Mutation(() => Task)
  async createTask(
    @Arg('inputData') inputData: TaskCreateValidation,
    @Ctx() ctx: MyContext
  ): Promise<Task | null> {
    try {
      const task = await this.taskService._createTask(inputData, ctx);
      return task;
    } catch (e) {
      throw new Error('Something went wrong!');
    }
  }
}
