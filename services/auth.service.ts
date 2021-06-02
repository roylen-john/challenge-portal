import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { serverApiRoutes } from '../utils/apiUtils'

const login = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { emp_id, password } = req.body
  return await axios
    .post(
      process.env.HOST + serverApiRoutes.LOGIN,
      {
        emp_id,
        password,
      },
      { headers: req.headers }
    )
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(err.response.status).json(err.response.data))
}

const register = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { emp_id, password, name } = req.body
  return await axios
    .post(
      process.env.HOST + serverApiRoutes.REGISTER,
      {
        name,
        emp_id,
        password,
      },
      { headers: req.headers }
    )
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(err.response.status).json(err.response.data))
}

const verify = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  return await axios
    .post(process.env.HOST + serverApiRoutes.VERIFY, null, {
      headers: req.headers,
    })
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(err.response.status).json(err.response.data))
}

export { login, register, verify }
