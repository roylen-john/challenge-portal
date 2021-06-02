import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { serverApiRoutes } from '../utils/apiUtils'

const getAllTags = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  return await axios
    .get(process.env.HOST + serverApiRoutes.GET_TAGS, { headers: req.headers })
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(err.response.status).json(err.response.data))
}

export { getAllTags }
