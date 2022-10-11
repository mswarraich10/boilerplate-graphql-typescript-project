import { Service } from 'typedi';
import { Task } from '../../entity/Task';
import { MyContext } from '../../types/MyContext';
import { ITaskService } from './interface';
import { TaskCreateValidation, TaskUpdateValidation } from './types';

@Service()
export class TaskService implements ITaskService {
  /**
   * Function to get all the tasks
   * @returns task array
   */
  async _getAllTask(): Promise<Task[]> {
    const tasks = await Task.find();
    if (tasks.length === 0) throw new Error('No Task Found!');
    return tasks;
  }

  /**
   *
   * @param id : id of task
   * @returns task
   */
  async _getSingleTask(id: number): Promise<Task | null> {
    const task = await Task.findOne({ where: { id } });
    if (!task) throw new Error('Task Not Found');
    return task;
  }

  /**
   * Function to get tasks of current user
   * @param ctx : context
   * @returns task array
   */

  async _getTaskByUser(ctx: MyContext): Promise<Task[]> {
    const tasks = await Task.find({
      where: { userId: ctx.user!.id },
      relations: ['user'],
    });
    return tasks;
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
      });
      task.user = ctx.user;

      return await task.save();
    } catch (e) {
      throw new Error('something went wrong!');
    }
  }

  /**
   *
   * @param id : task id to delete
   * @returns True/False
   */
  async _deleteTask(id: number): Promise<Boolean> {
    const res = await Task.delete({ id });
    if (res.affected && res.affected >= 0) return true;
    return false;
  }

  /**
   *
   * @param data : Task Data
   * @param ctx : context
   * @returns task
   */
  async _updateTask(data: TaskUpdateValidation, ctx: MyContext): Promise<Task> {
    const task = await Task.findOne({ where: { id: data.id } });
    if (!task) throw new Error('Task not found');
    if (ctx.user.id !== task!.userId)
      throw new Error('You are not allowed to update');

    task.isCompleted = data.isCompleted ?? task.isCompleted;
    task.name = data.name ?? task.name;
    task.description = data.description ?? task.description;
    return await task.save();
  }
}
