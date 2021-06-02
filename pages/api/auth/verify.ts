import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from '../../../services/auth.service'
import { requestMethods } from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case requestMethods.POST:
      await verify(req, res)
      break

    default:
      res.status(404).end()
      break
  }
}
