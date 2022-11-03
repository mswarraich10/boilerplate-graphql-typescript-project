import {
  HTTP403Error,
  HTTP404Error,
  HTTP500Error,
  Messages,
} from '../../errors'
import { Service } from 'typedi'
import { Task } from '../../db/entities/Task'
import { MyContext } from '../../types/MyContext'
import { ITaskService } from './interface'
import { TaskCreateValidation, TaskUpdateValidation } from './types'

@Service()
export class TaskService implements ITaskService {
  /**
   * Function to get all the tasks
   * @returns task array
   */
  async _getAllTask(): Promise<Task[]> {
    const tasks = await Task.find()
    if (tasks.length === 0) throw new HTTP404Error(Messages.TASKS_NOT_FOUND)
    return tasks
  }

  /**
   *
   * @param id : id of task
   * @returns task
   */
  async _getSingleTask(id: number): Promise<Task | null> {
    const task = await Task.findOne({ where: { id } })
    if (task === null) throw new HTTP404Error(Messages.TASK_NOT_FOUND)
    return task
  }

  /**
   * Function to get tasks of current user
   * @param ctx : context
   * @returns task array
   */

  async _getTaskByUser(ctx: MyContext): Promise<Task[]> {
    const tasks = await Task.find({
      where: { userId: ctx.user.id },
      relations: ['user'],
    })
    if (tasks.length === 0) throw new HTTP404Error(Messages.TASKS_NOT_FOUND)
    return tasks
  }

  /**
   *
   * @param data : Task data - name, desription
   * @param ctx : context
   * @returns task
   */
  async _createTask(data: TaskCreateValidation, ctx: MyContext): Promise<Task> {
    try {
      const task = Task.create({
        name: data.name,
        description: data.description,
      })
      task.user = ctx.user
      return await task.save()
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }

  /**
   *
   * @param id : task id to delete
   * @returns True/False
   */
  async _deleteTask(id: number): Promise<Boolean> {
    try {
      const res = await Task.delete({ id })
      if (res.affected != null && res.affected >= 0) return true
      return false
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }

  /**
   *
   * @param data : Task Data
   * @param ctx : context
   * @returns task
   */
  async _updateTask(data: TaskUpdateValidation, ctx: MyContext): Promise<Task> {
    const task = await Task.findOne({ where: { id: data.id } })
    if (task == null) throw new HTTP404Error(Messages.TASK_NOT_FOUND)
    if (ctx.user.id !== task.userId)
      throw new HTTP403Error(Messages.UNAUTORIZED_OPERATION)

    task.isCompleted = data.isCompleted ?? task.isCompleted
    task.name = data.name ?? task.name
    task.description = data.description ?? task.description
    try {
      return await task.save()
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }
}
