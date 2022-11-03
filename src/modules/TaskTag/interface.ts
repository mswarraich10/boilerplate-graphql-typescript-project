import { TaskTag } from '../../db/entities/TaskTag'

export interface ITaskTagService {
  _createTaskTag: (taskId: number, tag: string) => Promise<TaskTag | null>
  _removeTag: (taskId: number, tagId: number) => Promise<boolean>
}
