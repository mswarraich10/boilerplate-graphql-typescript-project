import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { UserRole } from '../../../db/entities/User'
import { MyContext } from '../../../types/MyContext'
import { Task } from '../../../db/entities/Task'
import { TaskService } from '../service'
import { Inject, Service } from 'typedi'

@Service()
@Resolver()
export class TaskGet {
  @Inject()
  private readonly taskService: TaskService

  /**
   *
   * @returns Task array
   */
  @Authorized([UserRole.ADMIN])
  @Query(() => [Task])
  async allTask(): Promise<Task[]> {
    const tasks = await this.taskService._getAllTask()
    return tasks
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
      const tasks = await this.taskService._getTaskByUser(ctx)
      return tasks
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
