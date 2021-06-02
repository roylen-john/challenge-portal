import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { serverApiRoutes as apiRoutes } from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    await axios
      .post(process.env.HOST + apiRoutes.VERIFY, null, {
        headers: req.headers,
      })
      .then((response) => res.status(200).json(response.data))
      .catch((err) => res.status(err.response.status).json(err.response.data))
  } else {
    res.status(404).end()
  }
}
