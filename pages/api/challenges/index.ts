import { NextApiRequest, NextApiResponse } from 'next'
import {
  createChallenge,
  getAllChallenges,
} from '../../../services/challenge.service'
import { requestMethods } from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case requestMethods.GET:
      await getAllChallenges(req, res)
      break

    case requestMethods.POST:
      await createChallenge(req, res)
      break

    default:
      res.status(404).end()
      break
  }
}
