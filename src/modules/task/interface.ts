import { Task } from '../../entity/Task';
import { MyContext } from '../../types/MyContext';
import { TaskCreateValidation, TaskUpdateValidation } from './types';

export interface ITaskService {
  _getAllTask(): Promise<Task[]>;
  _getSingleTask(id: number): Promise<Task | null>;
  _getTaskByUser(ctx: MyContext): Promise<Task[]>;
  _createTask(data: TaskCreateValidation, ctx: MyContext): Promise<Task>;
  _deleteTask(id: number): Promise<Boolean>;
  _updateTask(data: TaskUpdateValidation, ctx: MyContext): Promise<Task>;
}
