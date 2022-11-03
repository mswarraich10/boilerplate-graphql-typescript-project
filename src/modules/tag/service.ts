import { HTTP404Error, HTTP500Error, Messages } from '../../errors'
import { Service } from 'typedi'
import { Tag } from '../../db/entities/Tag'
import { ITagService } from './interface'
import { TagCreateValidation } from './types'

@Service()
export class TagService implements ITagService {
  /**
   *
   * @returns array of all tags
   */
  async _getAllTags(): Promise<Tag[] | null> {
    const tags = await Tag.find()
    if (tags.length === 0) throw new HTTP404Error(Messages.TAGS_NOT_FOUND)
    return tags
  }

  /**
   *
   * @param name of tag
   * @returns tag
   */
  async _getTag(name: string): Promise<Tag | null> {
    const tag = await Tag.findOne({ where: { name } })
    if (tag === null) throw new HTTP404Error(Messages.TAG_NOT_FOUND)
    return tag
  }

  /**
   *
   * @param data containing tag name
   * @returns tag
   */
  async _createTag(data: TagCreateValidation): Promise<Tag> {
    const tag = Tag.create({
      name: data.name,
    })
    try {
      return await tag.save()
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }

  /**
   *
   * @param id of the tag to be updated
   * @param data
   * @returns tag
   */
  async _updateTag(id: number, data: TagCreateValidation): Promise<Tag> {
    const tag = await Tag.findOne({ where: { id } })
    if (tag === null) throw new HTTP404Error(Messages.TAG_NOT_FOUND)
    tag.name = data.name ?? tag.name
    try {
      return await tag.save()
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }

  /**
   *
   * @param id of tag to be deleted
   * @returns true/false
   */
  async _deleteTag(id: number): Promise<Boolean> {
    try {
      const res = await Tag.delete({ id })
      if (res.affected != null && res.affected >= 0) return true
      return false
    } catch (e) {
      throw new HTTP500Error(Messages.SOMETHING_WENT_WRONG)
    }
  }
}
