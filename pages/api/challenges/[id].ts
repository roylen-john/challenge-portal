import { NextApiRequest, NextApiResponse } from 'next'
import {
  getOneChallenge,
  voteChallenge,
} from '../../../services/challenge.service'
import { requestMethods } from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case requestMethods.GET:
      await getOneChallenge(req, res)
      break

    case requestMethods.PATCH:
      await voteChallenge(req, res)
      break

    default:
      res.status(404).end()
      break
  }
}
