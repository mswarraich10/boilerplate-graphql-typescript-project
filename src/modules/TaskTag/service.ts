import { Service } from 'typedi';
import { TaskTag } from '../../entity/TaskTag';
import { TagService } from '../tag/service';
import { ITaskTagService } from './interface';

@Service()
export class TaskTagService implements ITaskTagService {
  tagService = new TagService();

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
    let tag = await this.tagService._getTag(tagName);
    if (!tag)
      tag = await this.tagService._createTag({
        name: tagName,
      });
    const found = await TaskTag.findOne({
      where: { tag_id: tag?.id, task_id: taskId },
    });
    if (found) return found;

    const created = await TaskTag.create({
      task_id: taskId,
      tag_id: tag.id,
    }).save();
    if (created) return created;
    return null;
  }

  /**
   * Removes the row
   * @param taskId
   * @param tagId
   * @returns true/false
   */
  async _removeTag(taskId: number, tagId: number): Promise<boolean> {
    const res = await TaskTag.delete({ task_id: taskId, tag_id: tagId });
    if (res.affected && res.affected >= 0) return true;
    else return false;
  }
}
