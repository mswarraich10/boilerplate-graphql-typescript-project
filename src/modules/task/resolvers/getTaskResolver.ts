import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { UserRole } from '../../../entity/User';
import { MyContext } from '../../../types/MyContext';
import { Task } from '../../../entity/Task';
import { TaskService } from '../service';
import { Inject, Service } from 'typedi';

@Service()
@Resolver()
export class TaskGet {
  @Inject()
  private readonly taskService: TaskService;

  /**
   *
   * @returns Task array
   */
  @Authorized([UserRole.ADMIN])
  @Query(() => [Task])
  async allTask(): Promise<Task[]> {
    try {
      const tasks = await this.taskService._getAllTask();
      return tasks;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   *
   * @param ctx : context
   * @returns Array Tasks of current user
   */
  @Authorized()
  @Query(() => [Task], { nullable: true })
  async getMyTasks(@Ctx() ctx: MyContext): Promise<Task[] | null> {
    try {
      const tasks = await this.taskService._getTaskByUser(ctx);
      return tasks;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
