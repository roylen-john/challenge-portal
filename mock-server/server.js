/**
 * Disabling rules for this file as its a mock server
 */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const port = 8000

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
const userRouter = jsonServer.router('./users.json')
let userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults())

const SECRET_KEY = '@JWTS3CR3T'

const expiresIn = '1h'

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  )
}

// Check if the user exists in database
function isAuthenticated({ emp_id, password }) {
  userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
  return (
    userdb.users.findIndex(
      (user) => user.emp_id === emp_id && user.password === password
    ) !== -1
  )
}

const noPassword = ({ password, ...rest }) => rest

let access_token
// Register New User
server.post('/auth/register', (req, res) => {
  console.log('register endpoint called; request body:')
  console.log(req.body)
  const { emp_id, password, name } = req.body

  if (isAuthenticated({ emp_id, password }) === true) {
    const status = 401
    const message = 'User already exist'
    res.status(status).json({ status, message })
    return
  }

  fs.readFile('./users.json', (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({ status, message })
      return
    }

    // Get current users data
    var data = JSON.parse(data.toString())

    // Get the id of last user
    var last_item_id =
      data.users.length > 0 ? data.users[data.users.length - 1].id : 0

    //Add new user
    const newUser = {
      id: last_item_id + 1,
      emp_id: emp_id,
      password: password,
      name: name,
    }
    data.users.push(newUser) //add some data
    access_token = createToken(noPassword(newUser))

    var writeData = fs.writeFileSync(
      './users.json',
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({ status, message })
          return
        }
      }
    )

    // Create token for new user
    console.log('Access Token:' + access_token)
    res.status(200).json({ access_token })
  })
})

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log('login endpoint called; request body:')
  console.log(req.body)
  const { emp_id, password } = req.body
  if (isAuthenticated({ emp_id, password }) === false) {
    const status = 401
    const message = 'Incorrect username or password'
    res.status(status).json({ status, message })
    return
  }
  const user = userdb.users.find(
    (user) => user.emp_id === emp_id && user.password === password
  )
  console.log('User found:', user)
  const access_token = createToken(noPassword(user))
  console.log('Access Token:' + access_token)
  res.status(200).json({ access_token })
})

server.post('/auth/verify', (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({ status, message })
    return
  }
  try {
    let verifyTokenResult
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1])

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token invalid'
      res.status(status).json({ status, message })
      return
    }
    res.status(200).json({ verified: true })
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({ status, message })
  }
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({ status, message })
    return
  }
  try {
    let verifyTokenResult
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1])

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token invalid'
      res.status(status).json({ status, message })
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({ status, message })
  }
})

server.use('/auth', userRouter)
server.use('/mock', router)

server.listen(port, () => {
  console.log(`Mock JSON Server listening on port ${port}`)
})
