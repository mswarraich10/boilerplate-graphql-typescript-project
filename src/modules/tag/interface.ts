import { Tag } from '../../db/entities/Tag'
import { TagCreateValidation } from './types'

export interface ITagService {
  _getAllTags: () => Promise<Tag[] | null>
  _getTag: (name: string) => Promise<Tag | null>
  _createTag: (data: TagCreateValidation) => Promise<Tag>
  _deleteTag: (id: number) => Promise<Boolean>
  _updateTag: (id: number, data: TagCreateValidation) => Promise<Tag>
}
