import { useRouter } from 'next/router'
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { clientApiRoutes } from '../../utils/apiUtils'
import { routes } from '../../utils/constants'
import { apiClient } from '../../utils/utils'
import jwt_decode from 'jwt-decode'

export interface iUser {
  id: number
  emp_id: string
  name: string
}

interface iAuthContext {
  user: iUser
  login: (user) => Promise<void>
  register: (user) => Promise<void>
  logout: () => void
}

const authContextDefaultValues: iAuthContext = {
  user: null,
  login: async () => {
    /* Do Nothing */
  },
  register: async () => {
    /* Do Nothing */
  },
  logout: () => {
    /* Do Nothing */
  },
}

const AuthContext = createContext<iAuthContext>(authContextDefaultValues)

export function useAuth(): iAuthContext {
  return useContext(AuthContext)
}

interface iAuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: iAuthProviderProps): ReactElement {
  const [user, setUser] = useState<iUser>(
    typeof window !== 'undefined' && localStorage.getItem('accessToken')
      ? jwt_decode<iUser>(localStorage.getItem('accessToken'))
      : null
  )
  const router = useRouter()

  const login = async (user) => {
    return await apiClient()
      .post(clientApiRoutes.LOGIN, user)
      .then((response) => {
        const token = response.data.access_token
        localStorage.setItem('accessToken', token)
        const user = jwt_decode<iUser>(token)
        setUser(user)
        router.push({
          pathname: routes.ALL_CHALLENGES,
          query: { page: 1, sort: 'created_at', order: 'desc' },
        })
      })
      .catch((err) => {
        toast(err.response.data.message, { type: 'error' })
      })
  }

  const register = async (user) => {
    return await apiClient()
      .post(clientApiRoutes.REGISTER, user)
      .then((response) => {
        const token = response.data.access_token
        localStorage.setItem('accessToken', token)
        const user = jwt_decode<iUser>(token)
        setUser(user)
        router.push({
          pathname: routes.ALL_CHALLENGES,
          query: { page: 1, sort: 'created_at', order: 'desc' },
        })
      })
      .catch((err) => {
        toast(err.response.data.message, { type: 'error' })
      })
  }

  const logout = async () => {
    localStorage.removeItem('accessToken')
    await router.push(routes.HOME)
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
