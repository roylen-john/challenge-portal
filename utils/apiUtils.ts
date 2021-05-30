const serverApiRoutes = {
  LOGIN: '/auth/login',
  VERIFY: '/auth/verify',
  REGISTER: '/auth/register',
  GET_CHALLENGES: '/mock/challenges',
  GET_USERS: '/auth/users',
  GET_TAGS: '/mock/tags',
}

const clientApiRoutes = {
  LOGIN: '/api/auth/login',
  VERIFY: '/api/auth/verify',
  REGISTER: '/api/auth/register',
  GET_CHALLENGES: '/api/challenges',
}

export { serverApiRoutes, clientApiRoutes }
