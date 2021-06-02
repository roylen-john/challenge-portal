import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { serverApiRoutes, voteActions } from '../utils/apiUtils'

const getAllChallenges = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    // Hacky way of forming relations because json-server does not support relations
    const challenge_response = await axios.get(
      process.env.HOST + serverApiRoutes.CHALLENGES,
      {
        headers: req.headers,
        params: {
          _page: req.query._page,
          _limit: process.env.CHALLENGE_PAGE_LIMIT,
          _sort: req.query._sort === 'votes' ? 'votes.length' : req.query._sort, // votes.length allows sorting on the length of the array
          _order: req.query._order,
        },
      }
    )

    const users_response = await axios.get(
      process.env.HOST + serverApiRoutes.GET_USERS,
      {
        headers: req.headers,
      }
    )

    const tags_response = await axios.get(
      process.env.HOST + serverApiRoutes.GET_TAGS,
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
    return res.status(error.response?.status || 405).end()
  }
}

const getOneChallenge = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { id } = req.query
    // Hacky way of forming relations because json-server does not support relations
    const challenge_response = await axios.get(
      process.env.HOST + serverApiRoutes.CHALLENGES + `/${id}`,
      {
        headers: req.headers,
      }
    )

    const users_response = await axios.get(
      process.env.HOST + serverApiRoutes.GET_USERS,
      {
        headers: req.headers,
      }
    )

    const tags_response = await axios.get(
      process.env.HOST + serverApiRoutes.GET_TAGS,
      {
        headers: req.headers,
      }
    )

    const response = { ...challenge_response.data }
    response.created_by = users_response.data.find(
      (user) => user.id === response.created_by
    )
    response.tags = response.tags.map((tagid) =>
      tags_response.data.find((tag) => tag.id === tagid)
    )
    delete response.created_by.password

    return res.status(200).json(response)
  } catch (error) {
    return res.status(error.response?.status || 405).end()
  }
}

const voteChallenge = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id, action } = req.query
  if (!req.cookies.user) {
    return res.status(401).end()
  }
  const user = JSON.parse(req.cookies.user)
  try {
    // Hacky way of forming relations because json-server does not support relations
    const challenge_response = await axios.get(
      process.env.HOST + serverApiRoutes.CHALLENGES + `/${id}`,
      {
        headers: req.headers,
      }
    )
    let vote_response = challenge_response
    if (action === voteActions.UPVOTE) {
      if (challenge_response.data.votes.includes(user.id)) {
        return res.status(304).end()
      }
      vote_response = await axios.patch(
        process.env.HOST + serverApiRoutes.CHALLENGES + `/${id}`,
        {
          votes: [...challenge_response.data.votes, user.id],
        },
        {
          headers: req.headers,
        }
      )
    } else if (action === voteActions.DOWNVOTE) {
      if (!challenge_response.data.votes.includes(user.id)) {
        return res.status(304).end()
      }
      vote_response = await axios.patch(
        process.env.HOST + serverApiRoutes.CHALLENGES + `/${id}`,
        {
          votes: challenge_response.data.votes.filter((id) => id !== user.id),
        },
        {
          headers: req.headers,
        }
      )
    }
    return res.status(200).json(vote_response.data)
  } catch (error) {
    return res.status(error.response?.status || 405).end()
  }
}

const createChallenge = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { title, description, tags } = req.body
  const user = JSON.parse(req.cookies.user)
  return await axios
    .post(
      process.env.HOST + serverApiRoutes.CHALLENGES,
      {
        title,
        description,
        tags: tags.map((tag) => tag.id),
        votes: [],
        created_by: user.id,
        created_at: new Date().toISOString(),
      },
      { headers: req.headers }
    )
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(err.response.status).json(err.response.data))
}

export { getAllChallenges, getOneChallenge, voteChallenge, createChallenge }
