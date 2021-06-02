import { iTag } from './tag.model'
import { iUser } from './user.model'

export interface iChallenge {
  id: number
  title: string
  description: string
  tags: iTag[]
  votes: number[]
  created_at: string
  created_by: iUser
}
