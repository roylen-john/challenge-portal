const serverApiRoutes = {
  LOGIN: '/auth/login',
  VERIFY: '/auth/verify',
  REGISTER: '/auth/register',
  CHALLENGES: '/mock/challenges',
  GET_USERS: '/auth/users',
  GET_TAGS: '/mock/tags',
}

const clientApiRoutes = {
  LOGIN: '/api/auth/login',
  VERIFY: '/api/auth/verify',
  REGISTER: '/api/auth/register',
  CHALLENGES: '/api/challenges',
  GET_TAGS: '/api/tags',
}

const voteActions = {
  UPVOTE: 'upvote',
  DOWNVOTE: 'downvote',
}

export { serverApiRoutes, clientApiRoutes, voteActions }
