import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { serverApiRoutes as apiRoutes } from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    try {
      // Hacky way of forming relations because json-server does not support relations
      const challenge_response = await axios.get(
        process.env.HOST + apiRoutes.GET_CHALLENGES,
        {
          headers: req.headers,
          params: {
            _page: req.query._page,
            _limit: process.env.CHALLENGE_PAGE_LIMIT,
            _sort: req.query._sort,
            _order: req.query._order,
          },
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

      const response = challenge_response.data.map((challenge) => {
        const temp = challenge
        temp.created_by = users_response.data.find(
          (user) => user.id === temp.created_by
        )
        delete temp.created_by.password
        temp.tags = temp.tags.map((tagid) =>
          tags_response.data.find((tag) => tag.id === tagid)
        )
        return temp
      })

      return res.status(200).json({
        challenges: response,
        records: {
          total_records: challenge_response.headers['x-total-count'],
          total_pages: Math.ceil(
            Number(challenge_response.headers['x-total-count']) /
              Number(process.env.CHALLENGE_PAGE_LIMIT)
          ),
        },
      })
    } catch (error) {
      res.json(error.response?.data || error)
      res.status(error.response?.status || 405).end()
    }
  } else {
    res.status(404).end()
  }
}
