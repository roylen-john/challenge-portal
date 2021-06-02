import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { serverApiRoutes as apiRoutes } from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    await axios
      .get(process.env.HOST + apiRoutes.GET_TAGS, { headers: req.headers })
      .then((response) => res.status(200).json(response.data))
      .catch((err) => res.status(err.response.status).json(err.response.data))
  } else {
    res.status(404).end()
  }
}
