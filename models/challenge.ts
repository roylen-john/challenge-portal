import { iTag } from './tag'
import { iUser } from './user'

export interface iChallenge {
  id: number
  title: string
  description: string
  tags: iTag[]
  votes: number[]
  created_at: string
  created_by: iUser
}
