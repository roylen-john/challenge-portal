import { NextApiRequest, NextApiResponse } from 'next'
import { getAllTags } from '../../../services/tag.service'
import { requestMethods } from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case requestMethods.GET:
      await getAllTags(req, res)
      break

    default:
      res.status(404).end()
      break
  }
}
