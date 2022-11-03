import { HTTP500Error, Messages } from '../../errors'
import { Service } from 'typedi'
import { TaskTag } from '../../db/entities/TaskTag'
import { TagService } from '../tag/service'
import { ITaskTagService } from './interface'

@Service()
export class TaskTagService implements ITaskTagService {
  tagService = new TagService()

  /**
   *
   * @param taskId
   * @param tagName
   * @returns TaskTag
   */
  async _createTaskTag(
    taskId: number,
    tagName: string
  ): Promise<TaskTag | null> {
    try {
      let tag = await this.tagService._getTag(tagName)
      if (tag == null)
        tag = await this.tagService._createTag({
          name: tagName,
        })
      const found = await TaskTag.findOne({
        where: { tag_id: tag?.id, task_id: taskId },
      })
      if (found != null) return found

      const created = await TaskTag.create({
        task_id: taskId,
        tag_id: tag.id,
      }).save()
      if (created !== null) return created
      return null
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }

  /**
   * Removes the row
   * @param taskId
   * @param tagId
   * @returns true/false
   */
  async _removeTag(taskId: number, tagId: number): Promise<boolean> {
    try {
      const res = await TaskTag.delete({ task_id: taskId, tag_id: tagId })
      if (res.affected != null && res.affected >= 0) return true
      else return false
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }
}
