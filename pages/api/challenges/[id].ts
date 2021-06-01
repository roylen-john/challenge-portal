import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { serverApiRoutes as apiRoutes } from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      // Hacky way of forming relations because json-server does not support relations
      const challenge_response = await axios.get(
        process.env.HOST + apiRoutes.GET_CHALLENGES + `/${id}`,
        {
          headers: req.headers,
        }
      )

      const users_response = await axios.get(
        process.env.HOST + apiRoutes.GET_USERS,
        {
          headers: req.headers,
        }
      )

      const tags_response = await axios.get(
        process.env.HOST + apiRoutes.GET_TAGS,
        {
          headers: req.headers,
        }
      )

      const response = challenge_response.data
      response.created_by = users_response.data.find(
        (user) => (user.id = response.created_by)
      )
      response.tags = response.tags.map((tagid) =>
        tags_response.data.find((tag) => tag.id === tagid)
      )
      delete response.created_by.password

      return res.status(200).json(response)
    } catch (error) {
      res.json(error.response?.data || error)
      res.status(error.response?.status || 405).end()
    }
  } else {
    res.status(404).end()
  }
}
