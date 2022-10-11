import { Service } from 'typedi';
import { Tag } from '../../entity/Tag';
import { ITagService } from './interface';
import { TagCreateValidation } from './types';

@Service()
export class TagService implements ITagService {
  /**
   *
   * @returns array of all tags
   */
  async _getAllTags(): Promise<Tag[] | null> {
    const tags = await Tag.find();
    if (tags.length === 0) throw new Error('No Tag found!');
    return tags;
  }

  /**
   *
   * @param name of tag
   * @returns tag
   */
  async _getTag(name: string): Promise<Tag | null> {
    const tag = await Tag.findOne({ where: { name } });
    if (!tag) return null;
    return tag;
  }

  /**
   *
   * @param data containing tag name
   * @returns tag
   */
  async _createTag(data: TagCreateValidation): Promise<Tag> {
    const tag = Tag.create({
      name: data.name,
    });
    return await tag.save();
  }

  /**
   *
   * @param id of the tag to be updated
   * @param data
   * @returns tag
   */
  async _updateTag(id: number, data: TagCreateValidation): Promise<Tag> {
    const tag = await Tag.findOne({ where: { id } });
    if (!tag) throw new Error('Tag not found');
    tag.name = data.name ?? tag.name;
    return await tag.save();
  }

  /**
   *
   * @param id of tag to be deleted
   * @returns true/false
   */
  async _deleteTag(id: number): Promise<Boolean> {
    const res = await Tag.delete({ id });
    if (res.affected && res.affected >= 0) return true;
    return false;
  }
}
